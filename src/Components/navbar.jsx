import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navy() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Centro Medico Del Valle</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#Consultas">Consultas</Nav.Link>
            <Nav.Link href="#Inventario">Inventario</Nav.Link>
            <Nav.Link href="#Sign Out">Cerrar Sesion</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navy;
