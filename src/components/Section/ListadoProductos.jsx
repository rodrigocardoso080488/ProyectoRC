/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Producto from "./Producto";
//El componente ListadoProducto monta el componente ModalEditar.
import ModalEditar from "./ModalEditar";
//Cuando el componente ListadoProductos se monte en el componente padre Administracion en el archivo Admin.jsx. Con el método Get se hará la petición de lo productos que tengo guardado en mi API o base de dato(json-server) en el archivo db.json.
//Cuando hacemos la petición necesitamos la ruta donde vamos hacer esa solicitud. esa ruta esta guardada en la constate API.

//El ciclo de vida de los componentes son 3: El montaje, la actualizacion y el desmontaje. Se desmonta un componente para liberar recursos o limpiar datos cuando el componente ya no es necesario. Para eso dentro del useEffect tengo que retornar la variable de actualización a su valor inicial.

const ListadoProductos = () => {
  //useState([]): Aquí se están declarando tres estados utilizando el hook de useState de React. Cada estado consta de dos elementos: el primero es una variable que almacena el valor del estado y el segundo es una función que se utiliza para actualizar dicho estado. las 3 variables son:
  // productos: Almacena un array de productos y se inicializa como un array vacío.
  // show: Es un estado que se utiliza para determinar si el modal debe mostrarse o no. Cuando show es true, el modal se muestra en la interfaz; cuando es false, el modal se oculta. Es un booleano que se inicializa como false.
  // prodEdit: Es una variable que inicialmente se establece como undefined.
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [prodEdit, setProdEdit] = useState(undefined);

  //handleClose: Es una función que se encarga de cambiar el estado de show a false, lo que se utiliza para ocultar o cerrar el modal. Antes de cerrarlo se actualizará el estado del producto editado en undefined.
  const handleClose = () => {
    setProdEdit(undefined);
    setShow(false);
  };
  //handleShow: Es una función que toma un parámetro prod (que se supone es un producto) y realiza dos acciones:
  // setProdEdit(prod): Actualiza el estado de prodEdit con el producto que se pasa como argumento.
  // setShow(true): Cambia el estado de show a true, lo que se utiliza para mostrar el modal en la interfaz.
  const handleShow = (prod) => {
    setProdEdit(prod);
    setShow(true);
  };

  const API = import.meta.env.VITE_API;

  //si nosotros queremos que esta función la utilice los componentes hijos (ej: <Producto></Producto> utilizada cuando se hace el mapeo en el return). Al componente declarado debo pasarle la función como props y declararla también el componente con la props que ingresa como parámetro.
  const getProductos = async () => {
    try {
      const response = await fetch(`${API}/productos`); //si no especifico el método de la petición, js entiende que el método es un GET.
      // console.log("respuesta de la peticion en formato de objeto javaScript:",response);
      const responseJson = await response.json();
      // console.log("respuesta de la peticion en formato de objeto JSON:",responseJson);
      setProductos(responseJson); //Una vez que obtengo la respuesta de la API, llamo a la funcion setProductos para procesar y mostrar los datos de los productos en la interfaz de usuario.
    } catch (error) {
      console.log("El error es =>", error);
    }
  };
  //Para llamar la funcion getProductos, tengo que hacerlo a través de los hooks (useEffect), el cual es una función a la cual se le pasa como argumento una arrow function y un array de dependencia. ese [] significa que la funcion flecha solamente se va a ejecutar en el montaje.
  //Además, se está devolviendo una función de limpieza en el useEffect que se ejecutará cuando el componente se desmonte. En este caso, la función de limpieza está estableciendo el estado de productos a un array vacío mediante setProductos([]). Esto puede ser útil para limpiar recursos o realizar acciones necesarias antes de que el componente sea eliminado por completo.
  //Un componente se desmonta en React cuando deja de renderizarse en el DOM. Esto puede ocurrir cuando el componente es eliminado de la interfaz de usuario, por ejemplo, al cambiar de página, al ocultar un modal o al navegar a otra sección de la aplicación.
  useEffect(() => {
    getProductos();
    return () => {
      setProductos([]);
    };
  }, []);
  // console.log("state productos", productos);
  //Tengo que recorrer el array de productos de mi json-server y decir por cada elemento o producto, sumar a la tabla una nueva fila con el nuevo componente Producto. Se utiliza las {} para renderizar una lista de productos en una tabla.
  //Se utiliza el método .map para iterar sobre un array de productos. Por cada elemento en el array, se ejecuta la función definida dentro del map. Para cada element en productos, se renderiza un componente <Producto> con las propiedades producto igual al elemento actual y key igual al id del elemento.

  //Se está utilizando un componente llamado <ModalEditar> al cual se le están pasando tres propiedades:
  // show={show}: Esta propiedad show se utiliza para determinar si el modal debe mostrarse o no. Está recibiendo el valor de la variable de estado show, que controla la visibilidad del modal en el componente principal.
  // handleClose={handleClose}: Esta propiedad handleClose se utiliza para pasar la función handleClose al componente <ModalEditar>. La función handleClose se encarga de ocultar el modal, por lo que al pasarla como propiedad, el componente <ModalEditar> podrá utilizarla para cerrar el modal cuando sea necesario.
  // producto={prodEdit}: Esta propiedad producto se utiliza para pasar información sobre un producto al componente <ModalEditar>. Está recibiendo el valor de la variable prodEdit, que probablemente contiene datos del producto que se está editando en el modal.

  return (
    <>
      <ModalEditar
        show={show}
        handleClose={handleClose}
        producto={prodEdit}
        getProductos={getProductos}
      ></ModalEditar>
      <div className="container-fluid">
        <div className="text-center">
          <h2>Listado Productos</h2>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((element) => {
                return (
                  <Producto
                    producto={element}
                    handleShow={handleShow}
                    key={element.id}
                    getProductos={getProductos}
                  ></Producto>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ListadoProductos;
