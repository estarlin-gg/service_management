/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "../api/axiosClient";
// import { IServiceType } from "../types";

export class ServiceTypeService {
  static getAllTypeService = async () : Promise<any> => {
    try {
      const res = await axiosClient.get("/ServiceType");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
}
