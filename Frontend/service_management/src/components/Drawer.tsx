import { useState, useEffect } from "react";
import { Button } from "./Button";
import { MdAssignment } from "react-icons/md";
import { IOrder, IUserOrders } from "../types";

interface DrawerProps {
  data: IUserOrders | null;
}

export const Drawer = ({ data }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleDrawer}
        className="btn-circle bg-blue-600 border-none fixed bottom-6 right-6 shadow-lg flex items-center justify-center"
      >
        <MdAssignment className="text-white text-2xl" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 p-2 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b p-2">
          <h2 className="text-xl">Mis Ordenes:</h2>
        </div>
        <div className="">
          {data ? (
            <>
              {data.orders.length > 0 ? (
                data.orders.map((order: IOrder) => (
                  <div
                    key={order.id}
                    className="border-b border-gray-200 py-2 text-sm"
                  >
                    <p>
                      <strong>Servicio:</strong> {order.serviceType}
                    </p>
                    <p>
                      <strong>Estado:</strong> {order.orderStatus}
                    </p>
                    <p>
                      <strong>Descripción:</strong> {order.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No hay órdenes disponibles.</p>
              )}
            </>
          ) : (
            <p className="text-gray-500 p-4">
              No se pudo cargar la información.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
