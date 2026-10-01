import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const location = useLocation();

  const isAuth = isAuthenticated || Boolean(token || localStorage.getItem("token"));

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
