import { Navigate } from "react-router-dom";
import { useAuth } from "../../security/auth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/auth/login" />;
  }
  return children;
};