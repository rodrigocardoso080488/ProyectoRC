/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
//El componente Home realiza una petición a una API para obtener una lista de productos y los muestra en la interfaz de usuario utilizando el componente CardProducto. Además, se utiliza el hook useEffect para realizar la petición al cargar el componente y el método map para recorrer y renderizar cada producto en la lista.

import { useEffect, useState } from "react";
import { Container, Row} from "react-bootstrap";
//instalamos e importamos axios. Petición axios funciona como peticion fetch. Ambas trabajan de manera asíncrona.
import axios from "axios";
import CardProducto from "../Section/CardProducto";

const Home = () => {
  const [productos, setProductos] = useState([]);

  const API = import.meta.env.VITE_API;

  //Como la funcion getProductos también la utilizo en el componente ListadoProducto, puedo definirla 1 sola vez en un archivo nuevo (ej. Helper) y llamarla desde Home y ListadoProducto. 
  const getProductos = async () => {
    try {
      const response = await axios(`${API}/productos`);
      // console.log("Response de la petición(axios) cuando se pide traer los productos al home =>", response);
      setProductos(response.data);
    } catch (error) {
      console.error("El error es =>", error);
    }
  };
  //Se utiliza el hook useEffect para llamar a la función getProductos al renderizar el componente. Además, se define una función de limpieza que reinicia el estado productos al desmontar el componente:
  useEffect(() => {
    getProductos(); 

    return () => {
      setProductos([]);
    };
  },[]);

  //En el return del componente, se renderiza una estructura HTML que muestra un título "Catálogos de Productos" y un listado de productos utilizando el método map sobre el array productos. Para cada producto, se renderiza un componente CardProducto con las propiedades producto y key:
  return (
    <div>
      <div className="text-center">
        <h1>Catálogos de Productos</h1>
      </div>
      <div className="my-5">
        <Container>
          <Row>
            {productos.map((element, index)=>{
                return (
                    <CardProducto producto={element} key={index}></CardProducto>
                )
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
