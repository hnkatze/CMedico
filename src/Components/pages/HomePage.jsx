import { Link } from "react-router-dom";
import { FaList, FaCalendar, FaSignOutAlt } from "react-icons/fa";
import "../css/homepage.css";
import Navy from "./navbar";
import { useAuth } from "../routes/AuthProvider";

function HomePage() {
  const { logout, userType } = useAuth();

  const inventoryLinkTo = userType === 1 ? "/Inventor" : "/Inven";

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Navy />
      <div className="navigation-links-container">
        {userType === 1 ? (
          <Link to={inventoryLinkTo} className="navigation-link">
            <div className="navigation-link-icon">
              <FaList />
            </div>
            <span>Inventario</span>
          </Link>
        ) : (
          <Link to="/Inven" className="navigation-link">
            <div className="navigation-link-icon">
              <FaList />
            </div>
            <span>Inventario</span>
          </Link>
        )}

        <Link to="/Consulta" className="navigation-link">
          <div className="navigation-link-icon">
            <FaCalendar />
          </div>
          <span>Consultas</span>
        </Link>
        <Link to="/" replace className="navigation-link" onClick={handleLogout}>
          <div className="navigation-link-icon">
            <FaSignOutAlt />
          </div>
          <span>Cerrar Sesión</span>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
