import { BrowserRouter, Routes, Route } from "react-router-dom";

import BarraNavegacion from "./components/Navbar/Navbar";
import Foot from "./components/Footer/Footer";

import Administracion from "./components/Pages/Admin";
import AcercaDeNosotros from "./components/Pages/Nosotros";
import Error from "./components/Pages/ErrorScreen";
import CrearProducto from "./components/Section/CrearProducto";
import Home from "./components/Pages/Home";
import Editar from "./components/Section/Editar";


//PARA ENRUTAR: Creamos en App nuestras rutas por que App es el componente padre que esta renderizando el index.html. PASOS: 
//1-Importar los componentes que van a venir de React Router Dom(se importará el Browser Router, Routes y Route). 2-Ir abajo de return y crear el sistema de rutas. Se debe declarar primero el componente padre (Browser Routes), luego Routes. Dentro de Routes se definirán todas las rutas (Route) que se van a poder navegar. En cada ruta van los Props. En el Props (path) se define la ruta (tal cual nosotros la escribiríamos en el navegador) con la "/" se define la raíz, es decir que es la primera pagina que va a renderizar cuando se inicie el navegador.Luego declaramos la propiedad element, para indicar el elemento o componente que se va a renderizar, el componte tiene que ir entre {}. En path se utiliza "/" para la ruta que me lleva al Inicio o Home. Ahora si el usuario escribe en el navegador cualquier cosa (rutas no declaradas), nos debería mandar a la pagina de error404, para eso tenemos que definir la ruta así: path="*" con su respectivo componente.
//Nota: Cada vez que declaremos un parámetro en un ruta(ej. /:id), ese parámetro es obligatorio. Cuando se lo utilice procurar de ser utilizado con el mismo nombre.
function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <BarraNavegacion />
        </header>
        <main>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/Nosotros" element={<AcercaDeNosotros />}></Route>
            <Route path="/Admin" element={<Administracion />}></Route>
            <Route path="*" element={<Error/>}></Route>
            <Route path="/crear-producto" element={<CrearProducto />}/>
            <Route path="/editar/:id/" element={<Editar/>} />
          </Routes>
        </main>
        <footer className="m-0 p-0">
          <Foot />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
