import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const EditOrder = () => {
  const { statuses, UpdateStatus, editId, handleModal } = useAppContext();

  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStatus !== null) {
      // Llamamos a UpdateStatus pasando el editId y el selectedStatus
      await UpdateStatus(selectedStatus);
    }
  };

  return (
    <Modal>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[80%] p-4 rounded-xl space-y-4 md:w-[400px]"
      >
        <div className="space-y-2 flex flex-col">
          <label htmlFor="status">Seleccionar estado</label>
          <select
            id="status"
            className="select select-bordered w-full"
            value={selectedStatus || ""}
            onChange={(e) => {
              console.log(Number(e.target.value));
              setSelectedStatus(Number(e.target.value));
            }}
          >
            <option value="" disabled>
              Selecciona un estado
            </option>
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          <Button type="submit" className="btn-primary w-full">
            Guardar
          </Button>
          <Button className="btn-error w-full" onClick={handleModal}>
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};
