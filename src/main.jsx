import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
// import './index.css'

//Este archivo importa los estilos css de bootstrap para poder usarlo en todos los componentes hijos de main.
import "bootstrap/dist/css/bootstrap.min.css"

//main.jsx es padre de App.jsx. App.jsx hereda todo de main.jsx, por lo tanto no hace falta importar de nuevo bootstrap dentro de app.jsx. lo que tenga el padre(main), lo hereda el hijo(app)
//El <React.StrictMode> es un componente de React que ayuda a identificar problemas en la aplicación y proporciona advertencias en el desarrollo. Dentro de este componente se renderiza el componente <App />, que probablemente sea el componente principal de la aplicación.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
