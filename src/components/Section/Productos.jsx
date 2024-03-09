/* eslint-disable no-undef */
// import { useState } from "react";
import { Button, Form } from "react-bootstrap";
// import { validarCategoria } from "../helpers/validaciones";

//Estas 3 librerias seran necesarias para realizar validaciones de formularios.
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";

import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

//una vez declaradas las variables de estado. Tengo que agregar al Form.Control el atributo value como valor la variable de estado (titulo), para que de esta manera tenga control sobre el state. Ademas debo agregar onChange(e), el cual recibe el evento. Para poder setear el estado y se actualice cuando el usuario lo desea, debo escribir dentro de onChange: setTitle(e.currentTarget.value).
//Cuando se haga click en guardar, se construira el objeto producto con sus propiedades.

const CrearProducto = () => {
  //   const [title, setTitle] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [category, setCategory] = useState("");
  const navigate = useNavigate();

  //Las variables de entorno se utilizan para almacenar información sensible, en este caso estamos importando una variable de entorno utilizando VITE como bundler(empaquetador). Al utilizar import.meta.env.VITE_API, se está accediendo al valor de la variable de entorno VITE_API en tiempo de compilación y asignándolo a la constante API. Es decir que se está obteniendo la URL de la API desde una variable de entorno definida en tu proyecto Vite.js.
  const API = import.meta.env.VITE_API;
  console.log("API-->:", API);

  //1ro-Definimos las reglas de validación.
  const ProductoSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "ingrese min 4 caractér")
      .max(20, "ingrese como máximo 20 caracter")
      .required("El título del producto es requerido"),
    description: Yup.string()
      .min(4, "Ingrese como min 4 caractér")
      .max(200, "Ingrese como máximo 200 caractér")
      .required("La descripción del producto es requerida"),
    category: Yup.string().required("La categoría es requerida"),
  });
  //2do-Inicializamos los inputs. Se crea un objeto que tenga los valores iniciales del formulario.
  const initialValues = {
    title: "",
    description: "",
    category: "",
  };

  //3ro-Inicializamos el objeto formik con: formik=useFormik.
  const formik = useFormik({
    initialValues,
    validationSchema: ProductoSchema,
    validationOnBlur: true,
    validationOnChange: true,

    //Cuando creamos el evento para mandar el formulario creado, lo enviamos a nuestro servidor (realizamos una peticion al servidor).
    //1ro-Agregamos la palabra async adelante de (values).
    //2do-Guardamos los valores del formulario en el servidor. Por convención se lo declara como response. Le digo que espere a buscar (await fetch) la info requerida o url de nuestra API(Variable de entorno) y nos devuelve una promesa.Como argumento le pasamos:
    // 1ro- Lo que vamos a guardar en el servidor, en este caso es un array con el nombre "producto" creado en db.json.
    //2do- El método, como estamos CREANDO O AGREGANDO un producto es "POST". Luego le configuramos los headers que son las cabeceras, con el tipo de contenido que vamos a enviar, como es un objeto JSON ("content-type":"application/json").
    // 3ro-Los valores que capturamos del formulario. Esos valores se envían mediante el body (cuerpo de la solicitud o petición http), como hay que enviar los valores(values) como JSON, hay que transformarlo con JSON.stringify.
    //Para limpiar el formulario: si el valor del estado del formulario guardado en el servidor (response.status) es estrictamente igual al código 201(es una respuesta exitosa a una creación, es decir al método POST), se reseteará el formulario creado con formik.

    onSubmit: (values) => {
      Swal.fire({
        title: "Estas seguro de guardar este producto ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // console.log("valor de Formik", values);
            const response = await fetch(`${API}/productos`, {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            // const data = await response.json();
            // console.log("response", response);
            // console.log(response.status);
            // console.log("data tiene las siguientes propiedades:", data)
            if (response.status === 201) {
              formik.resetForm();
              Swal.fire({
                title: "Éxito",
                text: "Se creó el producto exitosamente",
                icon: "success",
              });
            }
          } catch (error) {
            console.error("EL ERROR QUE TENES ES: ", error);
          }
        }
      });
    },
  });

  //Una vez hecha la peticion a json-server(que simula la base de dato) para que me guarde el producto. si voy a json-server en el archivo db.json voy a ver mi producto guardado. nota: no olvidar de poner a correr json-server antes de hacer la petición.

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Desde submit");
  //   const nuevoProducto = {
  //     titulo : title,
  //     descripcion : description,
  //     categoria : category
  //   };
  //   console.log("este es el nuevo producto: =>", nuevoProducto);
  // };

  return (
    //al pasarle -1 al método navigate, react-router-dom solo me detecta el árbol de gerarquía de como se fueron renderizando las rutas, entonces vuelve a la ruta anterior a la que estamos. TENER EN CUENTA: onClick necesita la función flecha. cuando se le pasa un solo argumento a la funcion flecha, se puede omitir las {}.
    <div className="container my-3 py-3">
      <Button variant="secondary" onClick={()=>navigate(-1)}>ATRÁS</Button> 
      <div className="text-center">
        <h2>CREAR PRODUCTOS</h2>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Título del producto</Form.Label>
          <Form.Control
            type="text"
            minLength={4}
            maxLength={25}
            placeholder="Ingrese aquí el título del producto"
            // value={title} Se agrega un value como valor la variable de estado (title) para controlar los inputs del formulario con el estado del componente. Además hay que agregar el evento onChange, para cuando cambie el contenido del inputs. cuando escuche el evento (e), cada vez que cambie el inputs, debemos actualizar el title para que tenga el valor que corresponda. Para eso hay que llamar a la funcion de actualizacion de estado (setTitle)
            // onChange={(e) => {
            //   setTitle(e.currentTarget.value);
            // }}
            name="title"
            {...formik.getFieldProps("title")}
            className={clsx(
              "form-control",
              { "is-invalid": formik.touched.title && formik.errors.title },
              { "is-valid": formik.touched.title && !formik.errors.title }
            )}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.title}</span>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la descripción del producto"
            as="textarea"
            rows={2}
            minLength={4}
            maxLength={200}
            // value={description}
            // onChange={(e) => {
            //   setDescription(e.currentTarget.value);
            // }}
            name="description"
            {...formik.getFieldProps("description")}
            className={clsx(
              "form-control",
              {
                "is-invalid":
                  formik.touched.description && formik.errors.description,
              },
              {
                "is-valid":
                  formik.touched.description && !formik.errors.description,
              }
            )}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.description}</span>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            aria-label="category"
            // value={category}
            // onChange={(e) => {
            //   const resultadoVali = validarCategoria(e.currentTarget.value);
            //   console.log(
            //     "el resultado de validar la categoria es",
            //     resultadoVali
            //   );
            //   setCategory(e.currentTarget.value);
            // }}
            // className={clsx(
            //   "form-select",
            //   { "is-valid": validarCategoria(category) },
            //   { "is-invalid": validarCategoria(category) }
            // )}
            name="category"
            {...formik.getFieldProps("category")}
            className={clsx(
              "form-control",
              {
                "is-invalid": formik.touched.category && formik.errors.category,
              },
              { "is-valid": formik.touched.category && !formik.errors.category }
            )}
          >
            <option value="">Seleccione una Categoría</option>
            <option value="Bebida">BEBIDA</option>
            <option value="Alimentos">ALIMENTOS</option>
            <option value="Limpieza">LIMPIEZA</option>
          </Form.Select>
          {formik.touched.category && formik.errors.category && (
            <div className="mt-2 text-danger fw-bolder">
              <span role="alert">{formik.errors.category}</span>
            </div>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          GUARDAR
        </Button>
      </Form>
    </div>
  );
};

export default CrearProducto;
