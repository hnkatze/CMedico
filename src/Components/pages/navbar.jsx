import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";

function Navy() {
  const { state } = useLocation();
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
            {state?.userType === 1 ? (
              <Link to="/Inventor" className="nav-link">
                Inventario
              </Link>
            ) : (
              <Link to="/Inven" className="nav-link">
                Inventario
              </Link>
            )}
            <Link to="/" replace className="nav-link">
              Cerrar Sesion
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navy;
