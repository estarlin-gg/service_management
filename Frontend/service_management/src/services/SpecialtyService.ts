/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "../api/axiosClient";

export class SpecialtyService {
  static async getAllSpecialties() {
    try {
      const response = await axiosClient.get("/specialties");
      return response.data;
    } catch (error) {
      console.error("Error al obtener todas las especialidades:", error);
      throw error;
    }
  }

  static async getSpecialtyById(id: number) {
    try {
      const response = await axiosClient.get(`/specialties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la especialidad con ID ${id}:`, error);
      throw error;
    }
  }

  static async createSpecialty(specialtyData: any) {
    try {
      await axiosClient.post("/specialties", specialtyData);
    } catch (error) {
      console.error("Error al crear una nueva especialidad:", error);
      throw error;
    }
  }

  static async updateSpecialty(id: number, specialtyData: any) {
    try {
      await axiosClient.put(`/specialties/${id}`, specialtyData);
    } catch (error) {
      console.error(`Error al actualizar la especialidad con ID ${id}:`, error);
      throw error;
    }
  }

  static async deleteSpecialty(id: number) {
    try {
      await axiosClient.delete(`/specialties/${id}`);
    } catch (error) {
      console.error(`Error al eliminar la especialidad con ID ${id}:`, error);
      throw error;
    }
  }
}
