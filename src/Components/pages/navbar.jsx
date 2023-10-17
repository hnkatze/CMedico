import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../routes/AuthProvider";

function Navy() {
  const { logout, userType } = useAuth();

  const inventoryLinkTo = userType === 1 ? "/Inventor" : "/Inven";

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/Home" className="navbar-brand">
            Centro Medico Del Valle
          </Link>
          <Nav className="ms-auto">
            <Link to="/Consulta" className="nav-link">
              Consultas
            </Link>

            <Link to={inventoryLinkTo} className="nav-link">
              Inventario
            </Link>

            <Link to="/" replace className="nav-link" onClick={handleLogout}>
              Cerrar Sesion
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navy;
