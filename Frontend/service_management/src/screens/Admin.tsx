// import { useEffect } from "react";
import { Stat } from "../components/Stat";
// import { ClientService } from "../services/Client.service";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useAdmin } from "../hooks/useAdmin";
import { CreateUser } from "../components/Admin/CreateUser";
import { useAppContext } from "../context/AppContext";

export const Admin = () => {
  const { modal, handleModal } = useAppContext();
  const { users } = useAdmin();

  const technicians = users.filter((u) => u.userRole === "Technician");
  const clients = users.filter((u) => u.userRole === "Client");

  return (
    <>
      <section className="p-4 space-y-6">
        <h1 className="text-4xl mb-4">Dashboard</h1>
        <div className="grid gap-4   grid-cols-1  sm:grid-cols-2 lg:grid-cols-4">
          <Stat title="Total de tecnicos" value={technicians.length} />
          <Stat title="Total de clientes" value={clients.length} />
          <Stat title="Total de ordenes pendientes" value={8} />
          <Stat title="Total de ordenes completadas" value={24} />
        </div>
        <div className="w-full">
          <div className="space-y-6">
            <div className="flex justify-between  items-center">
              <h2 className="text-3xl">Lista de usuarios</h2>
              <Button className="btn-success p-3" onClick={() => handleModal()}>
                crear usuario
              </Button>
            </div>
            <Table data={users} />
          </div>
        </div>
      </section>
      {modal && <CreateUser />}
    </>
  );
};
