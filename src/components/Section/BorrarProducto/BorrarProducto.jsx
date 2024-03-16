/* eslint-disable react/prop-types */
import "./borrarProducto.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
//Se necesita pasarle getProducto para que se actualice la tabla con los productos que tengo en el servidor luego de eliminarlo.
const BorrarProducto = ({ id, getProductos }) => {
  const API = import.meta.env.VITE_API;
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
          await axios.delete(`${API}/productos/` + id);
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
    <Button type="button" variant="danger" onClick={handleDelete}>
      ELIMINAR
    </Button>
  );
};
export default BorrarProducto;
