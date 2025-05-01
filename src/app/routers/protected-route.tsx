import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IProtectedRoute {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const tokens = JSON.parse(localStorage.getItem("accessToken") || "")
  console.log(`Access Token: ${tokens}`)
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens || !tokens.access_token) {
      console.warn("No valid tokens found, redirecting to login");
      navigate("/");
    }
  }, [tokens, navigate]);

  if (!tokens || !tokens.access_token) {
    return null;
  }

  return <>{children}</>;
};
