/* eslint-disable react/prop-types */

//El archivo react.svg en la carpeta assets es una imagen en formato SVG que se utiliza como un recurso visual en un proyecto de React. Este archivo se utilice para representar el logo de React u otro tipo de icono relacionado con la biblioteca de React en el proyecto.
//Al utilizar la biblioteca React-Bootstrap, se incluyen iconos prediseñados en formato SVG para su uso en la interfaz de usuario. Para utilizarlo se debe importar el archivo.

import imagenPrediseñadaReact from "../../assets/react.svg"
import { Button, Card, Col } from "react-bootstrap";

const CardProducto = ({ producto }) => {
  return (
      <Col xs={12} md={6}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={imagenPrediseñadaReact} />
          <Card.Body>
            <Card.Title>{producto.title}</Card.Title>
            <Card.Text>
              <span className="mb-2 d-block">{producto.description}</span>
              <span className="fs-4 d-block">{producto.category}</span>
            </Card.Text>
            <Button variant="primary">Ver más</Button>
          </Card.Body>
        </Card>
      </Col>
  );
};

export default CardProducto;
