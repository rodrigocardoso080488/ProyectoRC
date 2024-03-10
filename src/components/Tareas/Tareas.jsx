import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import ListaTareas from "./ListaTareas";
//import OtraListaTareas from "./OtraListaTareas";

//Con currentTarget.value accedo al valor del evento(en este caso cada vez que escribo una letra). 
// Una vez capturado el valor que nosotros ingresemos, el valor se lo guardara en la variable de estado "tarea". La funcion seteadora(setTarea) irá actualizando los valores cada vez que se ingrese un dígito o valor nuevo.
//Una vez que le doy click a guardar tarea,x ej. estudiar se guardará en la variable tarea . Luego estudiar se subirá a un arreglo([...tareas, tarea]) que inicialmente de lo declaró vació(useState([])). Nota: Subir la tarea a un arreglo de tareas, se logra con el operador Spread (...).
//Antes de cerrar el ultimo div, debo enlazar el componente hijo (ListaTarea) con el componente padre (Tareas), debo aclarar la variable de estado que quiero que se herede. En este caso se heredará todas las propiedades del array de tareas.

const Tareas = () => {
  const [nombreTarea, setNombreTarea] = useState("");
    //nombreTarea: Es la variable de estado que almacenará el nombre de una tarea. Inicialmente se establece como una cadena vacía ("").

  const [tareas, setTareas] = useState(JSON.parse(localStorage.getItem("task"))||[]);
    //tareas: Es la variable de estado que almacenará un array de tareas. Inicialmente se establece (con useState([])) como un array vacío [].setTareas: Es la función que se utiliza para actualizar el valor de tareas. Cuando se llama a esta función con un nuevo valor, React re-renderizará el componente funcional (Tareas) y actualizará el estado de tareas con ese nuevo valor. Al llamar a useState con un valor inicial, se inicializa una variable de estado y una función para actualizar ese estado. Cuando la función de actualización se llama con un nuevo valor, React re-renderiza el componente y actualiza el estado con ese nuevo valor. En resumen, el hook useState permite a los componentes funcionales de React tener estado interno y reaccionar a los cambios en ese estado de forma eficiente.
    
    //onChange(en cambio) se utiliza para actualizar nombreTarea cada vez que el usuario introduce o cambia texto en el campo de entrada. 
    //La función value se utiliza para mostrar y controlar el valor de un campo de entrada de texto en un formulario. En este caso, value={nombreTarea} establece el valor del campo de entrada de texto en el valor de nombreTarea.
  return (
    <div>
      <div className="container my-5 py-5 d-flex justify-content-center">
        <form>
          <Form.Group>
            <Form.Label>INGRESE EL NOMBRE DE LA TAREA A REALIZAR</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setNombreTarea(e.currentTarget.value);
              }}
              value={nombreTarea}
            ></Form.Control>
          </Form.Group>
          <Button
            type="button"
            variant="primary"
            className="my-3"
            onClick={() => {
              setTareas([...tareas, nombreTarea]);
              setNombreTarea("");
              localStorage.setItem("task",JSON.stringify([...tareas, nombreTarea]))
            }}
          >
            GUARDAR TAREA
          </Button>
        </form>
      </div>
      <ListaTareas //Los componentes funcionales o funciones: ListaTareas y OtraListaTareas reciben las propiedades del padre, para eso debe indicar las propiedades que ellos van a heredar de tareas, ya sea la variable de estado(tareas) y la funcion de actualizacion.
        tareas={tareas}
        setTareas={setTareas}
      />
      {/* <OtraListaTareas
        tareas={tareas} setTareas={setTareas}/> */}
    </div>
  );
};
export default Tareas;
