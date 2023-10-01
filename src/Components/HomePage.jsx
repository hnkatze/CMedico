import { Link } from 'react-router-dom'; // Si estás utilizando React Router
import { FaList, FaCalendar, FaSignOutAlt } from 'react-icons/fa'; // Importa iconos de react-icons
import './css/homepage.css'; // Importa el archivo de estilos CSS
import Navy from './navbar';

function HomePage() {
  return (
    <>
    <Navy />
    <div className="navigation-links-container">
      <Link to="/Inventor" className="navigation-link">
        <div className="navigation-link-icon">
          <FaList />
        </div>
        <span>Inventario</span>
      </Link>
      <Link to="/Consulta" className="navigation-link">
        <div className="navigation-link-icon">
          <FaCalendar />
        </div>
        <span>Consultas</span>
      </Link>
      <Link to="/signout" className="navigation-link">
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
