/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import Swal from "sweetalert2";
// import BorrarProducto from "./BorrarProducto/BorrarProducto";

//Cuando haga click en el botón editar, me tiene que llevar o redireccionar a la página de editar producto que tiene el formulario. Para eso tenemos que declarar una constante con el nombre navigate e igualarla a la función useNavigate. Al usar dicha función no olvidar de importar desde react-router-dom).

//Como yo necesito que al hacer click en el botón se identifique el usuario por su id. Tengo que pasarle entre backtick el producto con su respectivo id.

//El producto guardado en el servidor json-server ingresará como parámetro de la función Producto.

//La función handleShow en el código que proporcionaste se utiliza para mostrar un modal de edición cuando se hace clic en el botón con el texto "M-EDITAR". En particular, handleShow recibe como argumento el producto que se está mostrando en la fila de la tabla, y se encarga de manejar la lógica para mostrar el modal de edición correspondiente a ese producto en particular.

//La funciónes declaradas en el componente <ListadoProducto></ListadoProducto>, se la utilizan en este componente. Para eso debo indicar en en el componente ListadoProductos cuales son las funciones que va a recibir el componente hijo (<Producto></Producto>). <Producto></Producto> recibe las propiedades del padre en forma de objeto. Por eso las props van entre {}.

//hay 2 formas de eliminar 1 producto. realizando la función que lo elimina en un componente nuevo y luego montarlo abajo del botón eliminar o declarar la funcion con su lógica en este componente y luego llamarla con el evento onClick dentro del botón eliminar.

const Producto = ({ producto, handleShow, getProductos }) => {
  const navigate = useNavigate();
  const API=import.meta.env.VITE_API;
  const handleDelete = () => {
    Swal.fire({
      title: "Estas seguro de eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "NO, me equivoque",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API}/productos/`+producto.id,{
            method:"DELETE",
            headers:
            {"content-type":"application/json"            
          }
          });
          getProductos();
          Swal.fire({
            title: "Éxito",
            text: "Se borró el producto exitosamente",
            icon: "success",
          });
        } catch (error) {
          console.log("error:", error.message);
        }
      }
    });
  };
  return (
    <>
      <tr>
        <td>{producto.id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-around">
          <Button
            type="button"
            variant="warning"
            onClick={() => {
              navigate(`/editar/${producto.id}`);
            }}
          >
            EDITAR
          </Button>
          <Button
            type="button"
            variant="success"
            onClick={() => {
              console.log("modal de edición");
              handleShow(producto);
            }}
          >
            M-EDITAR
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
          >
            ELIMINAR
          </Button>
          {/* <BorrarProducto
            id={producto.id}
            getProductos={getProductos}
          ></BorrarProducto>  */}
        </td>
      </tr>
    </>
  );
};

export default Producto;
