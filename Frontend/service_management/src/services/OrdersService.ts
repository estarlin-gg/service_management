/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "../api/axiosClient";
import { IOrderStatusUpdateResponse, IStatusIdDto } from "../types";

export class ServiceOrderService {
  static async getAllOrders() {
    try {
      const response = await axiosClient.get("/ServiceOrder");
      return response.data;
    } catch (error) {
      console.error("Error al obtener todas las órdenes:", error);
      throw error;
    }
  }

  static async getOrderById(id: number) {
    try {
      const response = await axiosClient.get(`/ServiceOrder/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la orden con ID ${id}:`, error);
      throw error;
    }
  }

  static async createOrder(orderData: any) {
    try {
      await axiosClient.post("/ServiceOrder", orderData);
    } catch (error) {
      console.error("Error al crear una nueva orden:", error);
      throw error;
    }
  }

  static async updateOrder(id: number, orderData: any) {
    try {
      await axiosClient.put(`/ServiceOrder/${id}`, orderData);
    } catch (error) {
      console.error(`Error al actualizar la orden con ID ${id}:`, error);
      throw error;
    }
  }

  static async updateOrderStatus(
    orderId: number,
    statusData: IStatusIdDto
  ): Promise<IOrderStatusUpdateResponse> {
    try {
      // Enviamos la solicitud PUT con el estado actualizado
      const response = await axiosClient.put<IOrderStatusUpdateResponse>(
        `/ServiceOrder/status/${orderId}`,
        statusData
      );
      return response.data; // Retornamos la respuesta
    } catch (error) {
      console.error(
        `Error al actualizar el estado de la orden ${orderId}:`,
        error
      );
      throw error;
    }
  }

  static async deleteOrder(id: number) {
    try {
      await axiosClient.delete(`/ServiceOrder/${id}`);
    } catch (error) {
      console.error(`Error al eliminar la orden con ID ${id}:`, error);
      throw error;
    }
  }

  static getMyOrders = async () => {
    try {
      const res = await axiosClient.get("/ServiceOrder/myOrders");
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
}
