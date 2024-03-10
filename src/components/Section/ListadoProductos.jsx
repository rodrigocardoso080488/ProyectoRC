/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Producto from "./Producto";
//Cuando el componente ListadoProductos se monte en el componente padre Administracion en el archivo Admin.jsx. Con el método Get se hará la petición de lo productos que tengo guardado en mi API o base de dato(json-server) en el archivo db.json.
//Cuando hacemos la petición necesitamos la ruta donde vamos hacer esa solicitud. esa ruta esta guardada en la constate API.

//El ciclo de vida de los componentes son 3: El montaje, la actualizacion y el desmontaje. Se desmonta un componente para liberar recursos o limpiar datos cuando el componente ya no es necesario. Para eso dentro del useEffect tengo que retornar la variable de actualización a su valor inicial.

const ListadoProductos = () => {
  const [productos, setProductos]=useState([]);
  const API = import.meta.env.VITE_API;
  
  const getProductos = async () => {
    try {
      const response = await fetch(`${API}/productos`); //si no especifico el método de la petición, js entiende que el método es un GET.
      // console.log("respuesta de la peticion en formato de objeto javaScript:",response);
      const responseJson = await response.json();
      // console.log("respuesta de la peticion en formato de objeto JSON:",responseJson);
      setProductos(responseJson);
    } catch (error) {
      console.error("El error es =>", error);
    }
  };
  //Para llamar la funcion getProductos, tengo que hacerlo a través de los hooks (useEffect), el cual es una función a la cual se le pasa como argumento una arrow function y un array de dependencia. ese [] significa que la funcion flecha solamente se va a ejecutar en el montaje.
  useEffect(() => {
    getProductos(); //Una vez que lo llamo, debo guardar mi array de productos.

    return()=>{
      setProductos([]);
    }
  }, []);
  // console.log("state productos", productos);
  //Tengo que recorrer el array de productos de mi json-server y decir por cada elemento o producto, sumar a la tabla una nueva fila con el nuevo componente Producto. Se utiliza las {} para renderizar una lista de productos en una tabla.
  //Se utiliza el método .map para iterar sobre un array de productos. Por cada elemento en el array, se ejecuta la función definida dentro del map. Para cada element en productos, se renderiza un componente <Producto> con las propiedades producto igual al elemento actual y key igual al id del elemento.
  return (
    <div className="container-fluid">
      <div className="text-center">
        <h2>Listado Productos</h2>
      </div>
      
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
          {productos.map((element)=>{
            return(
              <Producto producto={element} key={element.id}/>
            )
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ListadoProductos;
