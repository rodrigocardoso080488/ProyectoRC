import ListadoProductos from "../Section/ListadoProductos";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//UseNavigate funciona de la misma forma que funciona window.location.replace. Siempre que queramos redirigir vamos a utilizar los métodos que nos proporciona react-router-dom. Por convención se crea una constante llamada navigate y se lo iguala al método useNavigate().

//Cuando el componente <ListadoProductos></ListadoProductos> se monte, necesito que se haga la peticion a la api o base de dato en json-server y me traiga todos los productos que tengo guardado en el servidor.

const Administracion = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container my-3 py-3">
        <Button
          variant="primary"
          onClick={() => {
            navigate("/crear-producto");
          }}
        >
          Crear Producto
        </Button>
      </div>
      <ListadoProductos></ListadoProductos>
    </div>
  );
};

export default Administracion;
