import { BrowserRouter, Routes, Route } from "react-router-dom";

import BarraNavegacion from "./components/Navbar/Navbar";
import Foot from "./components/Footer/Footer";

import Inicio from "./components/Pages/Home";
import Administracion from "./components/Pages/Admin";
import AcercaDeNosotros from "./components/Pages/Nosotros";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <BarraNavegacion />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Nosotros" element={<AcercaDeNosotros />}></Route>
            <Route path="/Admin" element={<Administracion />}></Route>
          </Routes>
        </main>
        <footer>
          <Foot />
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
