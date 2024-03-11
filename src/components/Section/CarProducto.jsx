/* eslint-disable react/prop-types */
import { Button, Card, Col } from "react-bootstrap";

const CarProducto = ({ producto }) => {
  return (
    <div>
      <Col xs={12} md={6}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
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
    </div>
  );
};

export default CarProducto;
