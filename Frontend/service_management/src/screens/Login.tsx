/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { AuthService } from "../services/AuthService";
// import { IUser } from "../types";

export const Login = () => {
  const { handleSubmit, register } = useForm();
  const OnSubmit = (data: any) => {
    console.log(data);
    AuthService.Login(data);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(OnSubmit)}
        className="w-[90%] flex flex-col gap-4 border px-4 py-6 rounded-xl md:max-w-[500px]"
      >
        <h2 className="text-center text-3xl">Inicia sesion</h2>
        <div className="space-y-2">
          <label className="text-lg block">Correo electronico</label>
          <Input
            className="input-bordered"
            type="email"
            {...register("email")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-lg block">Contrase;a</label>
          <Input
            className="input-bordered"
            type="password"
            {...register("password")}
          />
        </div>
        <span>
          No tienes cuenta?{" "}
          <Link to={"/register"} className="text-blue-500">
            inicia sesion
          </Link>
        </span>
        <div className="space-y-2">
          <Button className="w-full btn-primary">Iniciar</Button>
        </div>
      </form>
    </div>
  );
};
