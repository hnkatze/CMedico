import { Link, useLocation } from "react-router-dom";
import { FaList, FaCalendar, FaSignOutAlt } from "react-icons/fa";
import "../css/homepage.css";
import Navy from "./navbar";

function HomePage() {
  const { state } = useLocation();
  return (
    <>
      <Navy />
      <div className="navigation-links-container">
        {state?.userType === 1 ? (
          <Link to="/Inventor" className="navigation-link">
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
        <Link to="/" replace className="navigation-link">
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
