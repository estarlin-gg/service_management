import { axiosClient } from "../api/axiosClient";
import { Credentials, IUser } from "../types";
import { jwtDecode } from "jwt-decode";
export class AuthService {
  static Login = async (data: Credentials) => {
    try {
      const res = await axiosClient.post<Credentials>("/Auth/login", data);
      localStorage.setItem("credentials", JSON.stringify(res.data));
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  static Register = async (data: IUser) => {
    try {
      const res = await axiosClient.post("/Auth/register", data);
      localStorage.setItem("credentials", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  static VerifyToken = (t: string): boolean => {
    const decoded = jwtDecode(t);
    const expTime = decoded.exp! * 1000;

    return Date.now() > expTime;
  };
}
