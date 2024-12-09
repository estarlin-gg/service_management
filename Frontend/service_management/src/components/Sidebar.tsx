import { useState } from "react";

import {
  FaHome,
  FaBell,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

export const Sidebar = () => {
  const { LogOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: FaHome, label: "Home" },
    { icon: FaBell, label: "Notifications" },
    { icon: FaEnvelope, label: "Messages" },
    { icon: FaCog, label: "Settings" },
  ];

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 rounded-lg p-2 text-white bg-[#1a1b2e] md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <nav
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 md:w-16 flex-col justify-between bg-[#1a1b2e] py-4 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full md:w-auto flex items-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
            >
              <item.icon size={24} />
              <span className="ml-2 md:hidden">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={LogOut}
            className="w-full md:w-auto flex items-center rounded-lg p-2 text-white transition-colors hover:bg-white/10"
          >
            <FaSignOutAlt size={24} />
            <span className="ml-2 md:hidden">Log out</span>
          </button>
        </div>
      </nav>
    </>
  );
};
