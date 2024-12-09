import { useEffect, useState } from "react";
import { ServiceOrderService } from "../services/OrdersService";
import { IOrder, IStatus, IStatusIdDto } from "../types";
import { StatusService } from "../services/StatusService";

export const useTechnician = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [statuses, setStatuses] = useState<IStatus[]>([]);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await ServiceOrderService.getAllOrders();
        setOrders(res);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchStatus = async () => {
      try {
        const res = await StatusService.getAllStatus();
        setStatuses(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
    fetchStatus();
  }, []);

  const UpdateStatus = async ( statusId: number) => {
    console.log(editId,statusId)
    try {
      const statusDto: IStatusIdDto = { orderStatusId: statusId };

      await ServiceOrderService.updateOrderStatus(editId, statusDto);

      const updatedOrders = await ServiceOrderService.getAllOrders();
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return { orders, statuses, UpdateStatus, editId, setEditId };
};
