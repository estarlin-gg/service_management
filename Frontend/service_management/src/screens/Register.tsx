import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { IUser } from "../types";

export const Register = () => {
  const {Register} = useAuth()
  const { handleSubmit,register:formRegister } = useForm<IUser>();
  const OnSubmit = (data:IUser) => {
    Register(data);
    // console.log(data)
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(OnSubmit)}
        className="w-[90%] flex flex-col gap-4 border px-4 py-6 rounded-xl md:max-w-[500px]"
      >
        <h2 className="text-center text-3xl ">Registrate</h2>
        <div className="space-y-2">
          <label className="text-lg block">Nombre y apellido</label>
          <Input className="input-bordered" type="text" {...formRegister("fullname")} />
        </div>
        <div className="space-y-2">
          <label className="text-lg block">Correo electronico</label>
          <Input className="input-bordered" type="email" {...formRegister("email")} />
        </div>
        <div className="space-y-2">
          <label className="text-lg block">Contrase;a</label>
          <Input className="input-bordered" type="password" {...formRegister("password")} />
        </div>
        <span>
          Ya tienes cuenta?{" "}
          <Link to={"/login"} className="text-blue-500">
            inicia sesion
          </Link>
        </span>
        <div className="space-y-2">
          <Button className="w-full btn-primary">Registrar</Button>
        </div>
      </form>
    </div>
  );
};
