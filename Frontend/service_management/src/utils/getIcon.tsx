import {
  FaWrench,
  FaBolt,
  FaHammer,
  FaLock,
  FaSnowflake,
  FaPaintBrush,
  FaLeaf,
  FaPlug,
  FaBuilding,
  FaShieldAlt,
} from "react-icons/fa";

export const getIcon = (serviceName: string) => {
  switch (serviceName.toLowerCase()) {
    case "plomero":
      return <FaWrench />;
    case "electricista":
      return <FaBolt />;
    case "carpintero":
      return <FaHammer />;
    case "cerrajero":
      return <FaLock />;
    case "técnico en refrigeración":
      return <FaSnowflake />;
    case "pintor":
      return <FaPaintBrush />;
    case "jardinero":
      return <FaLeaf />;
    case "técnico en electrodomésticos":
      return <FaPlug />;
    case "albañil":
      return <FaBuilding />;
    case "instalador de sistemas de seguridad":
      return <FaShieldAlt />;
    default:
      return <FaWrench />;
  }
};
