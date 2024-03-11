import { BrowserRouter, Routes, Route } from "react-router-dom";

import BarraNavegacion from "./components/Navbar/Navbar";
import Foot from "./components/Footer/Footer";

import Inicio from "./components/Pages/Home";
import Administracion from "./components/Pages/Admin";
import AcercaDeNosotros from "./components/Pages/Nosotros";
import Error from "./components/Pages/ErrorScreen";
import CrearProducto from "./components/Section/CrearProducto";

//PARA ENRUTAR: Creamos en App nuestras rutas por que App es el componente padre que esta renderizando el index.html. PASOS: 1-Importar los componentes que van a venir de React Router Dom(se importará el Browser Router, Routes y Route). 2-Ir abajo de return y crear el sistema de rutas. Se debo usar primero el componente padre (Browser Routes), luego Routes. Dentro de Routes se definirán todas las rutas (Route) que se van a poder navegar. en cada ruta van los Props. En El Props (path) se define la ruta (tal cual nosotros la escribiríamos en el navegador) con la "/" se define la raíz, es decir que es la primera pagina que va a renderizar cuando se inicie el navegador. Luego debemos definir el componente se va renderizar(para eso usamos la propiedad element),  y entre {} vamos a definir el componente que se va a renderizar cuando estemos la ruta "/" (Inicio). Ahora si el usuario mande en el navegador(escriba en el navegador) cualquier cosa, nos debería mandar a la pagina de error404, para eso tenemos que definir la ruta asi: path="*", luego definir el elemento que me renderice hacia la pagina de error404.
function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <BarraNavegacion />
        </header>
        <main>
          <Routes>
            <Route index path="/" element={<Inicio />} />
            <Route path="/Nosotros" element={<AcercaDeNosotros />}></Route>
            <Route path="/Admin" element={<Administracion />}></Route>
            <Route path="*" element={<Error/>}></Route>
            <Route path="/crear-producto" element={<CrearProducto />}/>
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
