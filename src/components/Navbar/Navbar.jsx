import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink } from "react-router-dom";



//cuando enrutamos y utilizamos la etiqueta (<Nav.LICuando hago click en INICIO, ACERCA DE NOSOTROS O ADMINISTRACION la pagina se actualizara.

const BarraNavegacion = () => {
  return (
    <Navbar expand="lg" className="bg-dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Academia RC</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/Nosotros">Acerca De Nosotros</Nav.Link>
            <Nav.Link href="/Admin">Administración</Nav.Link> */}
            <NavLink to={'/'} className={'nav-link'}>Inicio</NavLink>
            <NavLink to={'/Nosotros'} className={'nav-link'}>Acerca de Nosotros</NavLink>
            <NavLink to={'/Admin'}  className={'nav-link'}>Administración</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default BarraNavegacion;