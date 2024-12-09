import { useAppContext } from "../context/AppContext";
import { useAuth } from "../hooks/useAuth";
import { useTechnician } from "../hooks/useTechnician";
import { Button } from "./Button";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface TableProps<T> {
  data: T[];
  // setOrderId: React.Dispatch<React.SetStateAction<number>>;
}

export const Table = <T extends Record<string, any>>({
  data,
  // setOrderId,
}: TableProps<T>) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const { handleModal,setEditId } = useAppContext();
  const { credentials } = useAuth();
 

  const handleEditClick = (id: number) => {
    setEditId(id);
    handleModal();
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}

            {credentials?.role === "Technician" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}

              {credentials?.role === "Technician" && (
                <td className="">
                  <Button
                    onClick={() => handleEditClick(row.id)}
                    className="btn-sm btn-success text-white"
                  >
                    editar
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
