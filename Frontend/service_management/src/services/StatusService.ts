import { axiosClient } from "../api/axiosClient";

export class StatusService {
  static getAllStatus = async () => {
    try {
      const res = await axiosClient.get("/Status");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
}
