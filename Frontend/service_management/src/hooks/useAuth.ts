import { Credentials, IUser } from "../types";
import { AuthService } from "../services/AuthService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../context/AppContext";

export const useAuth = () => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const { setLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem("credentials");
    if (localData) {
      // console.log("si hay algo");
      const dataParsed = JSON.parse(localData);
      try {
        const decodedToken = jwtDecode<Credentials>(dataParsed.token);

        setCredentials({
          email: decodedToken.email,
          fullName: decodedToken.fullName,
          token: dataParsed.token,
          role: decodedToken.role,
        });

        const isExp = AuthService.VerifyToken(dataParsed.token);
        if (!isExp) {
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error al decodificar el token", error);
        navigate("/login");
      }
    } else {
      // console.log("no hay datos en localStorage");
      navigate("/login");
    }
    setLoading(false);
  }, [navigate, setLoading]);

  const Register = async (data: IUser) => {
    try {
      setLoading(true);
      const res = await AuthService.Register(data);
      setCredentials(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const Login = async (data: Credentials) => {
    try {
      setLoading(true);
      const res = await AuthService.Login(data);
      setCredentials(res!);
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const LogOut = () => {
    setLoading(true);

    localStorage.removeItem("credentials");
    setLoading(false);
  };
  return {
    Register,
    Login,
    LogOut,
    credentials,
  };
};
