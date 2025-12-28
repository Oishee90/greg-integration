/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children, allowedRoles }) {
  const accessToken = useSelector((state) => state.auth?.access_token);

  const refreshToken = useSelector((state) => state.auth?.refreshToken);
  const user = useSelector((state) => state.auth?.user);

  // Handle nested structure for both admin and student
  const role = user?.role || user?.user?.role;
  // console.log(role);
  const isAuthenticated = user?.is_active || user?.user?.is_active;

  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
