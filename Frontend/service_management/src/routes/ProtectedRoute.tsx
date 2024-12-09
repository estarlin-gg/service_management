import { ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  role: string;
  children: ReactNode;
}

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { credentials } = useAuthContext();

  if (!credentials) {
    return <Navigate to={"/login"} />;
  }

  if (credentials.role !== role) {
    return <Navigate to={"/"} />;
  }

  return children;
};
