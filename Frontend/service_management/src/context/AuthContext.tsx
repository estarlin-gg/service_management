/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext } from "react";
import { IAuthContext } from "../types";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "../components/Loading";
import { useAppContext } from "./AppContext";

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const { loading } = useAppContext();

  const { credentials } = useAuth();

  return (
    <AuthContext.Provider value={{ credentials }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
