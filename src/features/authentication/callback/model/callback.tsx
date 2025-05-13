import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTokensQuery, useRefreshTokenMutation } from "@/shared/api/authentication";
import { useDispatch } from "react-redux";
import { authTokenChange } from "../../auth-slice/model/auth-slice";


export const Callback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const code = searchParams.get("code");

  const {
    data: tokens,
    isLoading,
    error,
  } = useGetTokensQuery(code || "", {
    skip: !code,
  });

  const [refreshToken] = useRefreshTokenMutation()

  useEffect(() => {
    if (tokens?.session?.id) {
      const fetchRefresh = async () => {
        try {
          console.log(tokens)
          dispatch(authTokenChange({
            accessToken: tokens.access_token,
            session_id: tokens.session.id
          }))
          navigate("/dashboard")
        } catch (err) {
          console.log("Refresh Token Failed", err)
        }
      }
      fetchRefresh()
    }
  }, [tokens, dispatch, navigate, refreshToken]);



  if (isLoading) {
    return <div className="w-full h-[100vh] flex items-center justify-center">
      <h1 className="text-xl font-bold">Processing login...</h1>
    </div>;
  }

  if (error) {
    console.error("Token fetch error:", error);
    return (
      <div className="w-full h-[100vh] flex items-center justify-center flex-col text-center">
        Failed to authenticate.{" "}
        {error && "status" in error
          ? `Error ${error.status}: ${JSON.stringify(error.data)}`
          : "Unknown error occurred"}
        <button onClick={() => navigate("/")} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Try Again
        </button>
      </div>
    );
  }

  if (!code) {
    return (
      <div>
        No authorization code found. Please{" "}
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 underline"
        >
          log in again
        </button>
        .
      </div>
    );
  }

  return <div className="w-full flex items-center justify-center h-[100vh]">
    <h1 className="text-xl font-bold">Authenticating...</h1>
  </div>;
};
