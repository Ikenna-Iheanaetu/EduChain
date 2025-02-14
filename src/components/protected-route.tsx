import { useAuth } from "../context/auth-context";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; //* Redirect to the sign-in page
  }

  return <Outlet />; //* Render the child routes if authenticated
}