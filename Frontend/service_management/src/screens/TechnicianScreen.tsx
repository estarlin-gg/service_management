// import { useState } from "react";
import { EditOrder } from "../components/EditOrder";
import { Table } from "../components/Table";
import { useAppContext } from "../context/AppContext";
import { useTechnician } from "../hooks/useTechnician";

export const TechnicianScreen = () => {
  const { orders } = useTechnician();
  const { modal } = useAppContext();
  // const [orderId, setOrderId] = useState<number >(0);
  return (
    <>
      <section className="w-full p-4 space-y-4 ">
        <div className=" flex gap-2 justify-between items-center border-b-2 py-2">
          <h2 className="font-bold text-2xl">Lista de Ordenes</h2>
        </div>
        <div className="">
          <Table data={orders}  />
        </div>
      </section>
      {modal && <EditOrder />}
    </>
  );
};
