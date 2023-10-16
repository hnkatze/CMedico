import { Navigate, Outlet } from "react-router-dom";

export const PrivateRouter = ({ Logged }) => {
  if (!Logged) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
