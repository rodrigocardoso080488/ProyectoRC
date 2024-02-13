import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
//main.jsx es padre de App.jsx. App.jsx hereda todo de main.jsx, por lo tanto no hace falta importar de nuevo boostrar dentro de app.jsx. lo que tenga el padre(main), lo hereda el hijo(app)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
