/* eslint-disable react-hooks/exhaustive-deps */
//Nota: Cuando se hace click en el botón editar en el componente producto, me redirecciona a la pagina de editar. Aquí hacemos una peticion a la api para que me traiga el producto y me lo muestre en el formulario. Cuando utilicemos el modal será diferente. El producto ingresara por parámetro como una Props.
import { Button, Form } from "react-bootstrap";

//Estas 3 librerias seran necesarias para realizar validaciones de formularios.
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//El parámetro (id) se lo extrae con el mismo nombre que se lo declaro en path en el componente App. Luego una vez capturado, hacer una petición a la api para que me devuelva el producto que coincida con el id declarado. Cuando Se declaro useEffect con [] vacío, esto significa que el efecto secundario va a funcionar(peticion a la api para traer los datos del producto) solamente en el montaje. Una vez que lo tenga capturada la data del producto debo guardarlo en un state, para que cuando se actualice el producto, también se actualice este componente.
const Editar = () => {
  const [producto, setProducto] = useState(undefined);

  //Las variables de entorno se utilizan para almacenar información sensible, en este caso estamos importando una variable de entorno utilizando VITE como bundler(empaquetador). Al utilizar import.meta.env.VITE_API, se está accediendo al valor de la variable de entorno VITE_API en tiempo de compilación y asignándolo a la constante API. Es decir que se está obteniendo la URL de la API desde una variable de entorno definida en tu proyecto Vite.js.

  const { id } = useParams();

  const API = import.meta.env.VITE_API;
  // console.log("API-->:", API);

  const getProducto = async () => {
    try {
      const { data } = await axios.get(`${API}/productos/${id}`);
      setProducto(data);
    } catch (error) {
      console.error("el error es:", error);
    }
  };
  //Otro efecto secundario de este useEffect es cambiarle los valores de los inputs al formulario cuando se lo  edite.
  useEffect(() => {
    console.log("id del producto a editar:", id);
    getProducto();
  }, []);

  const navigate = useNavigate();

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
  //Hay declarar que:
  //1ro- Se van a usar los valores iniciales.
  //2do- Se van a validar el esquema creado para el producto.
  //3ro- Se va a validar el producto si se pierde el foco del inputs.
  //4to- Se va a validar si se realiza cambios.
  const formik = useFormik({
    initialValues,
    validationSchema: ProductoSchema,
    validationOnBlur: true,
    validationOnChange: true,

    //Cuando creamos el evento para editar el formulario creado, lo enviamos a nuestro servidor (realizamos una peticion al servidor).
    //1ro-Agregamos la palabra async adelante de (values).
    //2do-Guardamos los valores del formulario en el servidor. Por convención se lo declara como response. Le digo que espere a buscar (await fetch) la info requerida o url de nuestra API(Variable de entorno) y nos devuelve una promesa. Como argumento le pasamos:
    // 1ro- Lo que vamos a editar en el servidor, en este caso es el producto con el id especificado que se encuentra en el array con el nombre "producto" creado en db.json.
    //2do- Como no sabemos si vamos EDITAR O ACTUALIZAR 1 o más campos un producto es "POST". Luego le configuramos los headers que son las cabeceras, con el tipo de contenido que vamos a enviar, como es un objeto JSON ("content-type":"application/json").
    // 3ro-Los valores que capturamos del formulario. Esos valores se envían mediante el body (cuerpo de la solicitud o petición http), como hay que enviar los valores(values) como JSON, hay que transformarlo con JSON.stringify.
    //Si el valor del estado de la respuesta de la petición (response.status) es estrictamente igual al código 200 (es una respuesta OK, es decir al método de la solicitud PUT), me va a redirigir a la pagina de administración(para eso uso el método navigate y especifico la ruta).

    onSubmit: (values) => {
      Swal.fire({
        title: "Estas seguro en editar este producto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // console.log("valor de Formik", values);
            const response = await fetch(`${API}/productos/${id}`, {
              method: "PUT",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            // const data = await response.json();
            // console.log("response", response);
            // console.log(response.status);
            // console.log("data tiene las siguientes propiedades:", data)
            if (response.status === 200) {
              Swal.fire({
                title: "Éxito",
                text: "Se actualizó el producto correctamente",
                icon: "success",
              });
            navigate("/Admin")
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

  console.log("producto API-STATE", producto);

  //En el parámetro de las dependencias, se declara: [producto], esto quiere decir que este efecto va a funcionar cuando se actualice los inputs del producto.
  //Nota:  se utiliza (producto!==undefined) en la condicional para asegurarse de que producto tenga un valor válido antes de intentar usarlo para actualizar el campo "title" en el formulario.
  //Como quiero actualizar los valores del formulario(formik), debo utilizar el método de formik setFieldValue y pasarle los siguientes parámetros:
  //1ro- El fiel(tiene que ser string). Son las propiedades declaradas en el objeto initialValue.
  //2do- El value. El valor del producto.
  //3ro- ShouldValidate?. Puede ser un boolean o undefined.
  //Nota: La dependencia [producto] al final de useEffect indica que la función useEffect se ejecutará cada vez que el valor de producto cambie.
  useEffect(() => {
    if (producto !== undefined) {
      formik.setFieldValue("title", producto.title, true);
      formik.setFieldValue("description", producto.description, true);
      formik.setFieldValue("category", producto.category, true);
    }
  }, [producto]);

  return (
    //al pasarle -1 al método navigate, react-router-dom solo me detecta el árbol de gerarquía de como se fueron renderizando las rutas, entonces vuelve a la ruta anterior a la que estamos. TENER EN CUENTA: onClick necesita la función flecha. cuando se le pasa un solo argumento a la funcion flecha, se puede omitir las {}.
    <div className="container my-3 py-3">
      <Button variant="secondary" onClick={() => navigate(-1)}>
        ATRÁS
      </Button>
      <div className="text-center">
        <h2>Editar Producto</h2>
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

export default Editar;
