// import { MdAssignment } from "react-icons/md";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ServiceCard } from "../components/ServiceCard";
import { useClient } from "../hooks/useClient";
import { getIcon } from "../utils/getIcon";
import { Drawer } from "../components/Drawer";
import { useAppContext } from "../context/AppContext";
import { CreateOrder } from "../components/Client/CreateOrder";

export const ClientScreen = () => {
  const { modal } = useAppContext();
  const { serviceTypes, myOrders } = useClient();
  return (
    <section className="w-full p-4 space-y-4 ">
      <div className=" flex gap-2 justify-between items-center border-b-2 py-2">
        <h2 className="font-bold text-2xl">Lista de servicios</h2>
        <div className="flex gap-2">
          <Input type="searcha" className="input-bordered input max-w-xs" />
          <Button className="btn-primary">Buscar</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {serviceTypes.map((s) => (
          <ServiceCard
            key={s.id}
            title={s.name}
            description={s.description}
            icon={getIcon(s.name)}
          />
        ))}
      </div>
      <Drawer data={myOrders} />

      {modal && <CreateOrder />}
    </section>
  );
};
