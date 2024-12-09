import { Navigate, useRoutes } from "react-router-dom";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { MainLayout } from "../layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Admin } from "../screens/Admin";
import { TechnicianScreen } from "../screens/TechnicianScreen";
import { ClientScreen } from "../screens/ClientScreen";
import { useAuthContext } from "../context/AuthContext";

export const AppRouter = () => {
  const { credentials } = useAuthContext();

  const routes = useRoutes([
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="Admin">
          <Admin />
        </ProtectedRoute>
      ),
    },
    {
      path: "/technician",
      element: (
        <ProtectedRoute role="Technician">
          <TechnicianScreen />
        </ProtectedRoute>
      ),
    },
    {
      path: "/client",
      element: (
        <ProtectedRoute role="Client">
          <ClientScreen />
        </ProtectedRoute>
      ),
     
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: credentials ? (
        <MainLayout />
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: "*",
      element: credentials ? (
        <Navigate to="/" replace />
      ) : (
        <Navigate to="/login" replace />
      ),
    },
  ]);

  return routes;
};
