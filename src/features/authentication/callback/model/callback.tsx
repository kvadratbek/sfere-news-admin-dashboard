import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTokensQuery, useRefreshTokenQuery } from "@/shared/api/authentication";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../auth-slice";


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

  const sessionId = tokens?.session.id ?? "";
  const { data: refreshToken} = useRefreshTokenQuery(sessionId)
  const access_token = refreshToken?.access_token && localStorage.setItem('accessToken', JSON.stringify(refreshToken?.access_token))
  console.log(access_token)
  
  useEffect(() => {
    if (tokens) {
      dispatch(logoutUser());
      console.log(tokens);
      navigate("/dashboard");
    }
  }, [tokens, dispatch, navigate]);

 

  if (isLoading) {
    return <div>Processing login...</div>;
  }

  if (error) {
    console.error("Token fetch error:", error);
    return (
      <div>
        Failed to authenticate.{" "}
        {error && "status" in error
          ? `Error ${error.status}: ${JSON.stringify(error.data)}`
          : "Unknown error occurred"}
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
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

  return <div>Authenticating...</div>;
};
