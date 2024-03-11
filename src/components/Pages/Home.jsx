/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import { useEffect, useState } from "react";
import { Container, Row} from "react-bootstrap";
import axios from "axios";
import CarProducto from "../Section/CarProducto";
//instalamos e importamos axios. Petición axios funciona como peticion fetch. Ambas trabajan de manera asíncrona.

const Home = () => {
  const [productos, setProductos] = useState([]);

  const API = import.meta.env.VITE_API;

  //Como la funcion getProductos también la utilizo en el componente ListadoProducto, puedo definirla 1 sola vez en un archivo nuevo (ej. Helper) y llamarla desde Home y ListadoProducto. 
  const getProductos = async () => {
    try {
      const response = await axios(`${API}/productos`);
      console.log("Response de axios=>", response);
      setProductos(response.data);
    } catch (error) {
      console.error("El error es =>", error);
    }
  };
  
  useEffect(() => {
    getProductos(); 

    return () => {
      setProductos([]);
    };
  },[]);

  //Como también tenemos que mostrar los productos creados. debemos mapearlos.
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
                    <CarProducto producto={element} key={index}></CarProducto>
                )
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
