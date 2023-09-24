
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navy() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">CM Del Valle</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Consultas</Nav.Link>
            <Nav.Link href="#features">Inventario</Nav.Link>
            <Nav.Link href="#pricing">Cerrar Sesion</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navy;