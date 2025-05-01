import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IProtectedRoute {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const tokens = localStorage.getItem("accessToken")
  // console.log(`Hi Iam Token ${tokens}`)
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens) {
      console.warn("No valid tokens found, redirecting to login");
      navigate("/");
    }
  }, [tokens, navigate]);

  if (!tokens) {
    return null;
  }

  return <>{children}</>;
};
