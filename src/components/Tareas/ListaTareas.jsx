/* eslint-disable react/prop-types */
// Para usar el botón de react-bootstrap, debo importar sus funciones.
import Button from "react-bootstrap/Button";

//Para poder enlazar el componente hijo (ListaTareas) con el componente padre (Tareas), debo ir al archivo Tarea.jsx y montar (pegar): <ListaTareas></ListaTareas>. Al ser ListaTareas un hijo del componente padre Tarea, las propiedades (Props) se heredan, entonces al pasarle props, le paso las propiedades de Tarea para que la use el componente hijo. También funcionará si le paso directamente como argumento {tareas}.

const ListaTareas = ({tareas, setTareas}) => {
  // console.log("la propiedades que recibe el componente (ListaTarea) es: =>", Props);

  //Adentro del componente ListaTarea, se crea una funcion eliminarTarea. Al hacer clic en el botón de eliminar tarea, se va a mapear el array con las listas de tareas y me devolverá el index de donde se encuentra cada tarea. Ese index se lo utilizará como argumento de la funcion creada. 
  //con el método array.splice se elimina el elemento(tarea) que este ubicado en la posición de index que nosotros indiquemos.
  
  const eliminarTarea = (index)=> {
    let copiaTodasTareas=[...tareas]; //crea una copia del array de tareas.
    console.log("la copia del array de tarea es:", copiaTodasTareas);
    let tareaEliminada = copiaTodasTareas.splice(index,1); //elimina la tarea del indice especificado.
    console.log("la tarea eliminada del array de tarea es:", tareaEliminada);
    setTareas(copiaTodasTareas); //Actualiza el estado con las nuevas tareas que quedan.
    console.log("Las tareas pendientes son:", copiaTodasTareas)
    localStorage.setItem("task",JSON.stringify(copiaTodasTareas)); //Con el método splice ya se elimino la tarea con el indice especifica y el array se actualizo con la lista de tareas pendiente. Debo crear ese nuevo.array.
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">  
        <h3>Lista de tareas a realizar</h3>
        <Button
          type="button"
          variant="danger"
          onClick={() => {
            console.log("Desde el boton eliminar todo");
            setTareas([]);
            localStorage.setItem("task",JSON.stringify([]));
          }}
        >
          Eliminar todas las tareas
        </Button>
      </div>
          
      <ol>
        {tareas.map((elemento, index) => {
          return (
            <div key={index} className='my-2'>
              <li>
                <div className="d-flex justify-content-between">
                  <p>{elemento}</p>
                  <Button type="button"
                          variant="success" 
                          onClick={()=>{
                    eliminarTarea(index);
                  }}>
                    Eliminar esta tarea
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
export default ListaTareas;
