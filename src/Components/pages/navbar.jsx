import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; 


function Navy() {
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand">Centro Medico Del Valle</Link>
        <Nav className="ms-auto">
          <Link to="/Consulta" className="nav-link">Consultas</Link>
          <Link to="/Inventor" className="nav-link">Inventario</Link>
          <Link to="/signout" className="nav-link">Cerrar Sesion</Link>
        </Nav>
      </Container>
    </Navbar>
  </>
  );
}

export default Navy;
