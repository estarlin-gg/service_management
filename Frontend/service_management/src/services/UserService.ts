/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "../api/axiosClient";
import { IUser } from "../types";

export class UserService {
  static async createUser(userData:IUser): Promise<any> {
    try {
      const response = await axiosClient.post("/User", userData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error}`);
    }
  }

  static async getAllUsers(): Promise<any> {
    try {
      const response = await axiosClient.get("/User");
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error}`);
    }
  }

  static async getUserById(id: number): Promise<any> {
    try {
      const response = await axiosClient.get(`/User/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener el usuario con ID ${id}: ${error}`);
    }
  }

  static async updateUser(
    id: number,
    userData: Record<string, any>
  ): Promise<any> {
    try {
      const response = await axiosClient.put(`/User/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al actualizar el usuario con ID ${id}: ${error}`);
    }
  }

  static async deleteUser(id: number): Promise<any> {
    try {
      const response = await axiosClient.delete(`/User/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al eliminar el usuario con ID ${id}: ${error}`);
    }
  }
  static async getAllRoles(): Promise<any> {
    try {
      const response = await axiosClient.get("/User/roles");
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener los roles: ${error}`);
    }
  }
}
