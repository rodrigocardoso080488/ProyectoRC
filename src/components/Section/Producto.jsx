/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";

//El producto guardado en el servidor json-server ingresará como parámetro de la función Producto.

const Producto = ({ producto }) => {
    
  return (
    <>
      <tr>
        <td>{producto.id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-around"> 
            <Button type="button" variant="warning">EDITAR</Button>
            <Button type="button" variant="danger">ELIMINAR</Button>
        </td>
      </tr>
    </>
  );
};

export default Producto;
