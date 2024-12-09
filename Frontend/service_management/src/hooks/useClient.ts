import { useEffect, useState } from "react";
import { ICreateOrder, IServiceType, IUserOrders } from "../types";
import { ServiceTypeService } from "../services/ServiceTypeService";
import { ServiceOrderService } from "../services/OrdersService";
import { useAppContext } from "../context/AppContext";

export const useClient = () => {
  const [serviceTypes, setServiceTypes] = useState<IServiceType[]>([]);
  const [myOrders, setMyOrders] = useState<IUserOrders | null>(null);
  const { setLoading } = useAppContext();

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const res = await ServiceTypeService.getAllTypeService();
        setServiceTypes(res);
      } catch (error) {
        console.error("Error fetching service types:", error);
        setServiceTypes([]);
      }
    };

    const fechOrders = async () => {
      try {
        const res = await ServiceOrderService.getMyOrders();
        setMyOrders(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServiceTypes();
    fechOrders();
  }, []);

  const validateOrderData = (data: ICreateOrder): boolean => {
    if (!data.serviceTypeId || isNaN(Number(data.serviceTypeId))) {
      console.error("El tipo de servicio no es válido.");
      return false;
    }

    if (!data.description || data.description.trim() === "") {
      console.error("La descripción no puede estar vacía.");
      return false;
    }

    return true;
  };

  const CreateOrder = async (data: ICreateOrder) => {
    setLoading(true);
    try {
      if (!validateOrderData(data)) {
        throw new Error("Datos de la orden inválidos.");
      }

      const updatedData = {
        ...data,
        serviceTypeId: Number(data.serviceTypeId),
      };

      console.log("Datos enviados al backend:");

      const orderCreated = await ServiceOrderService.createOrder(updatedData);

      console.log("Orden creada exitosamente:", orderCreated);
    } catch (error) {
      console.error("Error al crear la orden:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    serviceTypes,
    CreateOrder,
    myOrders,
  };
};
