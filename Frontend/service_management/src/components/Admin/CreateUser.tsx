import { useForm } from "react-hook-form";
import { IUser } from "../../types";
import { Input } from "../Input";

import { useAdmin } from "../../hooks/useAdmin";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { useAppContext } from "../../context/AppContext";

export const CreateUser = () => {
  const { handleModal } = useAppContext();

  const { CreateUser, roles, specialties } = useAdmin();
  const { register, handleSubmit } = useForm<IUser>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      userRoleId: 0,
      specialtyId: 0,
    },
  });

  const onSubmit = (data: IUser) => {
    CreateUser(data);
    handleModal();
  };

  return (
    <>
      <Modal>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-[80%]  p-4 rounded-xl space-y-2 md:w-[400px]"
        >
          <h2 className="text-center text-3xl">Crear usuario</h2>
          <div className="space-y-4">
            <label htmlFor="fullname" className="block">
              Full name:
            </label>
            <Input
              id="fullname"
              {...register("fullname", { required: true, maxLength: 40 })}
              type="text"
              className="input-bordered border-2 w-full outline-2"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="email" className="block">
              Correo electronico:
            </label>
            <Input
              id="email"
              {...register("email", { required: true, maxLength: 40 })}
              type="text"
              className="input-bordered border-2 w-full outline-2"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="password" className="block">
              Contraseña:
            </label>
            <Input
              id="password"
              {...register("password", { required: true, maxLength: 40 })}
              type="password"
              className="input-bordered border-2 w-full outline-2"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="userRole" className="block">
              Selecciona un rol:
            </label>
            <select
              id="userRole"
              className="select select-bordered w-full"
              {...register("userRoleId")}
            >
              <option value="" disabled>
                Elije un rol
              </option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            <label htmlFor="userRole" className="block">
              Especialidad:
            </label>
            <select
              id="userRole"
              className="select select-bordered w-full"
              {...register("specialtyId")}
            >
              <option value="" disabled>
                Elije una especialidad
              </option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            <Button className="w-full btn-success">Crear</Button>
            <Button onClick={handleModal} className="w-full btn-error">
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
