import { useForm } from "react-hook-form";
import { useAppContext } from "../../context/AppContext";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { useClient } from "../../hooks/useClient";
import { ICreateOrder } from "../../types";

export const CreateOrder = () => {
  const { handleModal } = useAppContext();
  const { serviceTypes, CreateOrder } = useClient();

  const { register, handleSubmit } = useForm<ICreateOrder>({
    defaultValues: {
      serviceTypeId: 0,
      description: "",
    },
  });

  const onSubmit = (data: ICreateOrder) => {
    console.log("Datos enviados al API:", data);

    CreateOrder(data);
    handleModal();
  };

  return (
    <Modal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-[80%] p-4 rounded-xl space-y-4 md:w-[400px]"
      >
        <h2 className="text-center text-3xl">Crear servicio</h2>
        <div className="space-y-4">
          <label htmlFor="serviceTypeId" className="block">
            Tipo de servicio:
          </label>
          <select
            id="serviceTypeId"
            className="select select-bordered w-full"
            {...register("serviceTypeId", { required: true })}
          >
            <option value="" disabled>
              Elige un servicio
            </option>
            {serviceTypes.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label htmlFor="description" className="block">
            Descripción:
          </label>
          <textarea
            {...register("description", { required: true, maxLength: 255 })}
            className="textarea w-full textarea-bordered"
            placeholder="Descripción del servicio"
          ></textarea>
        </div>
        <div className="space-y-4">
          <Button type="submit" className="w-full btn-success">
            Crear
          </Button>
          <Button onClick={handleModal} className="w-full btn-error">
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};
