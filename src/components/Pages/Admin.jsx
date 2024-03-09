import ListadoProductos from '../Section/ListadoProductos';
import { Button } from "react-bootstrap";

import {useNavigate} from "react-router-dom";
//UseNavigate funciona de la misma forma que funciona window.location.replace. Siempre que queramos redirigir vamos a utilizar los métodos que nos proporciona react-router-dom. Por convención se crea una constante llamada navigate y se lo iguala al método useNavigate().

const Administracion = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className='container my-3 py-3'>
                <Button variant="primary" onClick={()=>{navigate("/crear-producto")}}>Crear Producto</Button>
            </div>
            <ListadoProductos/>
        </div>
    );
};

export default Administracion;