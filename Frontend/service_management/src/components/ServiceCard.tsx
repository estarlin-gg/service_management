import { ReactNode } from "react";
import { Button } from "./Button";
import { useAppContext } from "../context/AppContext";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  const {handleModal} = useAppContext()
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4">
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>

      <div className="p-6 pt-0">
        <Button onClick={handleModal} className="w-full btn-primary text-white">
          Crear servicio
        </Button>
      </div>
    </div>
  );
};
