import { axiosClient } from "../api/axiosClient";
import { IUser } from "../types";

export class ClientService {
  static getAllUser = async () => {
    try {
      const res = await axiosClient("/User");
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  static createUser = async () => {
    try {
      await axiosClient.post<IUser>("/User");
    } catch (error) {
      console.log(error);
    }
  };
}
