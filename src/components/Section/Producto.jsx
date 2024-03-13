/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
//Cuando haga click en el botón editar, me tiene que llevar o redireccionar a la página de editar producto que tiene el formulario. Para eso tenemos que declarar una constante con el nombre navigate e igualarla a la función useNavigate. Al usar dicha función no olvidar de importar desde react-router-dom).

//Como yo necesito que al hacer click en el botón se identifique el usuario por su id. Tengo que pasarle entre backtick el producto con su respectivo id.

//El producto guardado en el servidor json-server ingresará como parámetro de la función Producto.
const Producto = ({ producto }) => {
    const navigate = useNavigate();
  return (
    <>
      <tr>
        <td>{producto.id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-around"> 
            <Button type="button" variant="warning" onClick={()=>{
              navigate(`/editar/${producto.id}`)
            }}>EDITAR</Button>
            <Button type="button" variant="danger" onClick={()=>{
              console.log("Desde el botón eliminar");
            }}>ELIMINAR</Button>
        </td>
      </tr>
    </>
  );
};

export default Producto;
