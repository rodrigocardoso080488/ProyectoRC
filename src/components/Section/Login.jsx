/* eslint-disable react/prop-types */
import { Button, Modal, Form } from "react-bootstrap";
import clsx from "clsx"; //Librería para agregar clases CSS basadas en ciertas condiciones.
import * as Yup from "yup"; //Librería de validación de esquemas que se utiliza para definir esquemas de validación para los datos del formulario.
import { useFormik } from "formik"; //Librería para la gestión de formularios.
import axios from "axios";
import UserContext from "../../Context/UserContext";
import { useContext } from "react";

const Login = ({ isOpen, handleClose }) => {
  //DEBO EXTRAER setCurrentUser (funcion que actualiza los valores del usuario) y saveUserSession (usuario guardado en el sessionStorage). Luego tengo que consumir ambas funciones.
  const { setCurrentUser, saveUserSession } = useContext (UserContext);

  //Si yo hago un console log, veo que esta el login pero no esta montado, para manejar el montaje va a depender de la variable de estado (isOpen) la cual es un booleano. Dicha variable de estado es declara en el componente <BarraDeNavegación>
  // console.log("modal montado");
  const API2=import.meta.env.VITE_API2;
  // console.log("El servidor (backend-productos) esta escuchando en el puerto 5000:", API2);
  const LoginSchema = Yup.object().shape({
    email: Yup
      .string()
      .email("Formato Inválido")
      .min(7).max(128)
      .required("Correo electrónico requerido"),
    password: Yup
      .string()
      .min(6)
      .max(20)
      .required("Contraseña requerida")
  });

  const initialValues = {
    email: "",
    password: ""
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validationOnBlur: true,
    validationOnChange: true,
    onSubmit: async (values) => {
      try {
        const response = await axios.post (`${API2}/users/login`, values);
        // console.log("La respuesta de la solicitud es:", response.data);

        //Consumimos el contexto creado en UserContext.js. Usamos la funcion que actualice el valor actual del usuario. Cuando la respuesta llegue al front, se la podrá usar a partir del padre (app), es decir todo el Árbol de componente. Cada vez que se inicie sesión con un usuario diferente, el back me devolverá el objeto JSON con el email, rol y token del usuario y yo lo podre usar en cualquier componente. nota: El usuario se lo guardará en el context (para poder ser usado en todos los componentes) y en el sessionStorage (para que al actualizar la pagina no se pierda la session y se tenga que volver a loguear)
        
        if (response.status===200) {
          saveUserSession(response.data);
          setCurrentUser(response.data);
          formik.resetForm();
          handleClose();
        }else{
           alert("Ocurrió un error")
        }
      } catch (error) {
        alert(`${error.response.data.message}`)
        console.error(error)
      }
    }
  });

  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>INICIAR SESIÓN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                min={7}
                max={128}
                placeholder="Ingrese su correo electrónico"
                name="email"
                {...formik.getFieldProps("email")}
                className={clsx(
                  "form-control",
                  { "is-invalid": formik.touched.email && formik.errors.email },
                  { "is-valid": formik.touched.email && !formik.errors.email }
                )}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                min={6}
                max={20}
                placeholder="Ingrese su contraseña"
                name="password"
                {...formik.getFieldProps("password")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.password && formik.errors.password,
                  },
                  {
                    "is-valid": formik.touched.password && !formik.errors.password,
                  }
                )}
              />
                {formik.touched.password && formik.errors.password && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.password}</span>
                </div>
                )}
            </Form.Group>
            <div>
              <Button type="submit" variant="success" className="mx-2">
                Ingresar
              </Button>
              <Button variant="danger" className="mx-2" onClick={handleClose}>
                Cerrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
