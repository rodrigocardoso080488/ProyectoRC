//Debo importar los componentes de react-bootstrap para poder usarlo.

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import Login from "../Section/Login";
import { useState } from "react";
//NavLink es un componente que me va a permitir realizar la navegación en el menú y ponerle estilos. Para eso debemos hacer el cambio, debemos borrar el Nav.Link que viene de react-bootstrap y sustituirlo por el NavLink que trajimos de react-router-dom. Este componte va a recibir como propiedad: (to), se pone el valor que definimos en path en App.
import { NavLink } from "react-router-dom";

//Para poder usar el  los estilos css de Navbar de react bootstrap se debe importar el estilo de bootstrap en los componentes padres (main.jsx o App.jsx).

//cuando enrutamos y utilizamos la etiqueta (<Nav.Link></Nav.Link>)Cuando hago click en INICIO, ACERCA DE NOSOTROS O ADMINISTRACION la pagina se actualizara. Para evitar eso, debemos usar la etiqueta de react router dom (NavLink)

const BarraNavegacion = () => {
  let activeStyle = {
    textDecoration: "underline",
    fontWeight: "bold",
  };
  //Estos hook se crean para manejar el visibilidad del modal. Inicialmente el modal esta en desactivado(oculto).
  //Cuando se llama a la funcion handleShow, la variable de estado (isOpen) pasa a True y se lo muestra.
  //Cuando se llama a la funcion hanldeClose, l variable (isOpen) vuelve a False y se lo oculta.
  //Nota: Si bien el hook useState se lo declara en este componente pero se lo maneja desde el componente Login. Por eso le paso a Login las propiedades isOpen y handleShow.
  const [isOpen, setIsOpen] = useState(false);
  const handleShow = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Login isOpen={isOpen} handleClose={handleClose}></Login>
      <Navbar expand="lg" className="bg-dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">CRUD</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/Nosotros">Acerca De Nosotros</Nav.Link>
            <Nav.Link href="/Admin">Administración</Nav.Link> */}
              <NavLink
                to={"/"}
                className={"nav-link"}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Inicio
              </NavLink>
              <NavLink
                to={"/Nosotros"}
                className={"nav-link"}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Acerca de Nosotros
              </NavLink>
              <NavLink
                to={"/Admin"}
                className={"nav-link"}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Administración
              </NavLink>
            </Nav>
            <Nav>
              <Button variant="success" className="mx-2 my-2 my-md-1" onClick={handleShow}>
                Login
              </Button>
              <Button variant="danger" className="mx-2 my-2 my-md-1">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default BarraNavegacion;
