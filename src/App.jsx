import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarraNavegacion from "./components/Navbar/Navbar";
import Foot from "./components/Footer/Footer";
import Administracion from "./components/Pages/Admin";
import AcercaDeNosotros from "./components/Pages/Nosotros";
import Error from "./components/Pages/ErrorScreen";
import CrearProducto from "./components/Section/CrearProducto";
import Home from "./components/Pages/Home";
import Editar from "./components/Section/Editar";
import UserContext from "./Context/UserContext";
import { useEffect, useState } from "react";

//PARA ENRUTAR: Creamos en App nuestras rutas por que App es el componente padre que esta renderizando el index.html. PASOS:
//1-Importar los componentes que van a venir de React Router Dom(se importará el Browser Router, Routes y Route). 2-Ir abajo de return y crear el sistema de rutas. Se debe declarar primero el componente padre (Browser Routes), luego las rutas (Routes). Dentro de Routes se definirán cada una de las ruta (Route) que se van a poder navegar. En cada ruta van las Props. En la Props (path) se define la ruta (tal cual nosotros la escribiríamos en el navegador) con la "/" se define la raíz, es decir que es la primera pagina que va a renderizar cuando se inicie el navegador.Luego declaramos la propiedad element, para indicar el elemento o componente que se va a renderizar, el componte tiene que ir entre {}. En path se utiliza "/" para la ruta que me lleva al Inicio o Home. Ahora si el usuario escribe en el navegador cualquier cosa (rutas no declaradas), nos debería mandar a la pagina de error404, para eso tenemos que definir la ruta así: path="*" con su respectivo componente.
//Nota: Cada vez que declaremos un parámetro en un ruta(ej. /:id), ese parámetro es obligatorio. Cuando se lo utilice procurar de ser utilizado con el mismo nombre.
function App() {
  //Se declara la variable de estado (currentUser) y la funcion que actualiza esa variable setCurrentUser(). En currenUser también se guardará la respuesta que manda el backend cuando cada usuario se loguee. NOTA: Del servidor llega un objeto con las propiedades: email, rol y token. cada componente podrá usar las propiedades del objeto. Nota: Desde el loguin se va a llamar a setCurrentUser y se le pasara como argumento response.data.
  const [currentUser, setCurrentUser] = useState(undefined);

  //Para que currentUser y setCurrentUser puedan ser accesible por todos los componentes hijos. Se lo debe proveer, para eso debo pasarle en Provider el valor(value) y en forma de objeto dicha variable y su funcion actualizadora.

  //Se crea 3 funciones para guardar, sacar y eliminar el usuario logueado en el sessionStorage. Luego hay que dejarla disponible (proveerla), para eso debo pasarle en Provider como valores de value. Luego para que se la pueda llamar(consumir) desde cualquier componente. nota: En userAuth se guardará la respuesta que manda el backend cuando cada usuario se loguee.
  const saveUserSession = (userAuth) => {
    sessionStorage.setItem("userAuth", JSON.stringify(userAuth));
  }
  //Como en el sessionStorage esta guardo el objeto en forma de String, al sacarlo debo parsearlo a objeto JS.
  const getUserSession = () => {
    return JSON.parse(sessionStorage.getItem("userAuth"));
  }

  const removeUserSession = () => {
    sessionStorage.removeItem("userAuth");
  }

  //Al actualizar la página en una aplicación React, se produce una recarga completa del DOM y los componentes se vuelven a montar desde cero. Es importante tener en cuenta que al hacer una recarga de página, se pierde el estado de los componentes(el usuario tendría que volver a ingresar sesión), por lo que es necesario diseñar la aplicación de manera que pueda recuperar o persistir los datos importantes para evitar pérdidas de información.
  //Cuando se renderiza los componentes en el DOM, se empiezan a montar todos los componentes y el primero es el padre (App). Cuando se monte, se pierde el estado actual de los componentes, es decir que currenUser volvería a undefined, para evitar esto y que los valores de esa variable de estado persista, se puede producir un efecto o acción secundaria como traer los valores del sessionStorage.
  //Explicación paso a paso:
  //El hook se ejecuta después de que el componente se renderiza en el DOM. El segundo argumento, [], indica que el efecto secundario se ejecutará (1vez), en el montaje , equivalente a componentDidMount en componentes de clase.
  //Aquí se llama a una función getUserSession() para obtener los datos de la sesión del usuario. Estos datos pueden provenir de localStorage, sessionStorage o cualquier otra fuente. Trayéndome el usuario del session me aseguro que los datos del usuario persistan cuando se la página se recargue.
  //Se verifica si sessionUser tiene un valor. Si es así, se actualiza el estado currentUser con los datos de la sesión del usuario utilizando setCurrentUser(sessionUser).
  //Esta parte del useEffect se ejecuta cuando el componente se desmonta. Aquí se establece el estado currentUser como undefined, lo que podría ser útil para limpiar el estado o realizar alguna acción de limpieza.
  //nota: 
  //al recargar la pagina se pierde el estado de los componentes, ya que react NO mantiene el estado de la aplicación entre recargas de páginas, por eso la funcion que actualiza el valor actual del usuario se le pasa sessionUser. currenUser mantendrá su valor que se extrajo del session.
  //La acción de limpiar una variable de estado en React se produce generalmente cuando se desea restablecer o eliminar datos almacenados en esa variable en situaciones específicas, como desmontar un componente, cambiar de página, cerrar un elemento modal o completar una acción. Esto ayuda a mantener la integridad de los datos y el rendimiento de la aplicación.

  useEffect (()=>{
    const sessionUser = getUserSession();
    if(sessionUser){
      setCurrentUser(sessionUser);
    }

    return ()=>{
      setCurrentUser(undefined);
    }
  },[])

  return (
    //La lógica en el return va entre {}.lógica: Si el objeto currentUser es distinto a undefined y si el rol del usuario es administrador, entonce llevame a la ruta que tiene el link "Administración"
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser, saveUserSession, getUserSession, removeUserSession }}>
        <BrowserRouter>
          <header>
            <BarraNavegacion />
          </header>
          <main>
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/Nosotros" element={<AcercaDeNosotros />}></Route>
              {currentUser !== undefined && currentUser.rol === "Admin" && (
                <Route path="/Admin" element={<Administracion />}></Route>
              )}
              <Route path="*" element={<Error />}></Route>
              <Route path="/crear-producto" element={<CrearProducto />} />
              <Route path="/editar/:id/" element={<Editar />} />
            </Routes>
          </main>
          <footer className="m-0 p-0">
            <Foot />
          </footer>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
