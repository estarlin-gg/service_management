/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "../api/axiosClient";

export class TechnicianService {
  static async getAllTechnicians() {
    try {
      const response = await axiosClient.get("/technicians");
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener los técnicos: ${error}`);
    }
  }

  static async getTechnicianById(id: number): Promise<any> {
    try {
      const response = await axiosClient.get(`/technicians/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener el técnico con ID ${id}: ${error}`);
    }
  }

  static async createTechnician(
    technicianData: Record<string, any>
  ): Promise<any> {
    try {
      const response = await axiosClient.post("/technicians", technicianData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al crear el técnico: ${error}`);
    }
  }

  static async updateTechnician(
    id: number,
    technicianData: Record<string, any>
  ): Promise<any> {
    try {
      const response = await axiosClient.put(
        `/technicians/${id}`,
        technicianData
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error al actualizar el técnico con ID ${id}: ${error}`);
    }
  }

  static async deleteTechnician(id: number): Promise<any> {
    try {
      const response = await axiosClient.delete(`/technicians/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al eliminar el técnico con ID ${id}: ${error}`);
    }
  }
}
