import { useAuthContext } from "../context/AuthContext";
import { Admin } from "../screens/Admin";
import { TechnicianScreen } from "../screens/TechnicianScreen";
import { ClientScreen } from "../screens/ClientScreen";
import { Sidebar } from "../components/Sidebar";

export const MainLayout = () => {
  const { credentials } = useAuthContext();

  if (!credentials) {
    return <div>Loading...</div>;
  }

  const renderContent = () => {
    switch (credentials.role) {
      case "Admin":
        return <Admin />;
      case "Technician":
        return <TechnicianScreen />;
      case "Client":
        return <ClientScreen />;
      default:
        return <div>No role found</div>;
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <Sidebar />
        <main className="transition-all duration-300 ease-in-out md:ml-16 p-0 pt-16 md:p-4 md:pt-4">
          {renderContent()}
        </main>
      </div>
    </>
  );
};
