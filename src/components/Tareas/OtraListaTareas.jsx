/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const OtraListaTareas = ({ tareas, setTareas}) => {
  
  const [task, setTask]=useState([]);

  useEffect(()=>{
    console.log("desde useefect")
    setTask(tareas);
  },[tareas]); 
  
  const eliminarTask = (index)=> {
    let nuevasTareas=[...tareas]; //crea una copia del array de tarea
    nuevasTareas.splice(index,1); //elimina la tarea del indice especificado.
    setTareas(nuevasTareas); //Actualiza el estado con las nuevas tareas
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h3>Otras lista de tareas a realizar</h3>
        <Button
          type="button"
          variant="danger"
          onClick={() => {
            console.log("desde el boton eliminar todo");
            setTareas([]);
          }}
        >
          Eliminar todas las tareas
        </Button>
      </div>
      <ol>
        {task.map((elemento, index) => {
          return (
            <div key={index} className='my-2'>
              <li>
                <div className="d-flex justify-content-between">
                  <p>{elemento}</p>
                  <Button type="button"
                          variant="success" 
                          onClick={()=>{
                    eliminarTask(index);
                  }}>
                    Realizada
                  </Button>
                </div>
              </li>
            </div>
          );
        })}
      </ol>
    </div>
  );
};
export default OtraListaTareas;