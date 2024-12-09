import { useEffect, useState } from "react";
import { IRoles, ISpecialty, IUser, IUserDto } from "../types";
import { UserService } from "../services/UserService";
import { useAppContext } from "../context/AppContext";
import { SpecialtyService } from "../services/SpecialtyService";

export const useAdmin = () => {
  const [users, setUsers] = useState<IUserDto[]>([]);
  const [roles, setRoles] = useState<IRoles[]>([]);
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const { setLoading } = useAppContext();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await UserService.getAllRoles();
        setRoles(res);
      } catch (error) {
        console.log(error);
        setRoles([]);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await UserService.getAllUsers();
        setUsers(res);
      } catch (error) {
        console.log(error);
        setUsers([]);
      }
    };

    const fechSpecialties = async () => {
      try {
        const res = await SpecialtyService.getAllSpecialties();
        setSpecialties(res);
      } catch (error) {
        console.log(error);
        setSpecialties([]);
      }
    };

    fetchRoles();
    fetchUsers();
    fechSpecialties();
  }, []);

  const CreateUser = async (data: IUser) => {
    setLoading(true);
    try {
      const updatedData = { ...data, userRoleId: Number(data.userRoleId) };
      console.log(updatedData);
      const userCreated = await UserService.createUser(updatedData);

      const userDto: IUserDto = {
        id: userCreated.id,
        fullname: userCreated.fullname,
        email: userCreated.email,
        userRole: userCreated.userRole,
        specialty: userCreated.specialty,
      };

      setUsers((prevUsers) => [...prevUsers, userDto]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    CreateUser,
    roles,
    users,
    specialties,
  };
};
