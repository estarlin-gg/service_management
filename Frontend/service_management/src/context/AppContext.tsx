import { createContext, ReactNode, useContext, useState } from "react";
import { IAppContext } from "../types";
import { useTechnician } from "../hooks/useTechnician";

interface AppContextProps {
  children: ReactNode;
}

const AppContext = createContext<IAppContext>({} as IAppContext);
export const AppProvider = ({ children }: AppContextProps) => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const { editId, setEditId,UpdateStatus ,statuses} = useTechnician();

  const handleModal = () => {
    setModal(!modal);
  };
  return (
    <AppContext.Provider
      value={{ modal, handleModal, loading, setLoading, editId, setEditId ,UpdateStatus,statuses}}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
