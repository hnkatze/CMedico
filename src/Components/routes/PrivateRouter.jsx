import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const PrivateRouter = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
