import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import "../components/FontAwesomeIcons";
import logo from "../images/logo.png";
import { useFormik } from "formik";
import { Entrenador } from "../model/Entrenador";
import * as Yup from "yup"
import Cookies from "js-cookie";
import EntrenadorContext from "../components/EntrenadorContext";
import KeyIcon from "@mui/icons-material/Key";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {

  const { setEntrenador } = useContext(EntrenadorContext);

  const formik = useFormik({
    initialValues: { email: "", contrasena: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Ingrese un correo electrónico.")
      .email("Ingrese un correo válido."),
      contrasena: Yup.string().required("Ingrese su contraseña."),
    }),
    onSubmit: async (values, actions) => {
      actions.resetForm();
      let response = await fetch("http://localhost:8080/api/v1/auth/autenticar/entrenador", { method: "POST", body: JSON.stringify(values, null, 2), headers: { "Content-Type": "application/json" } }); //Autentica al usuario
      let authResponse = await response.json();
      if (authResponse.autenticado) {
        let datosPromise = await fetch(`http://localhost:8080/api/v1/entrenador/entrenador/${authResponse.id}`); //Si el autenticado funciona, recibo la data entera del usuario
        let datosResponse = await datosPromise.json();
        let entrenador = new Entrenador(
          datosResponse.id,
          datosResponse.descripcion,
          datosResponse.calificacion,
          datosResponse.experiencia,
          datosResponse.latitud,
          datosResponse.longitud,
          datosResponse.activo,
          datosResponse.nombres,
          datosResponse.apellidos,
          datosResponse.email,
          datosResponse.genero,
          datosResponse.nombreMostrado,
          datosResponse.fechaNacimiento,
          datosResponse.capacidadClientes
      );
        console.log(entrenador)
        setIsAuthenticated(true);
        Cookies.set("IsAuthenticated", true);
        Cookies.set("entrenador", JSON.stringify(entrenador));
        setEntrenador(entrenador);

      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-blue-theme-200">
      <div className="shadow-xl rounded-lg p-6 bg-white object-contain">
        <div className="w-full flex justify-center align-center">
          <img src={logo} className="mb-10 w-60 h-auto"></img>
        </div>
        <form onSubmit={formik.handleSubmit}  >
          <TextField
            name="email"
            label="Correo"
            type="email"
            fullWidth
            error={formik.errors.email && formik.touched.email}
            helperText={formik.touched.email ? formik.errors.email : ""}
            InputProps={{
              endAdornment: <InputAdornment position="end"><AlternateEmailIcon /></InputAdornment>,
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            variant="standard"
          />
          <TextField
            name="contrasena"
            label="Contraseña"
            type="password"
            fullWidth
            error={formik.errors.contrasena && formik.touched.contrasena}
            helperText={formik.touched.email ? formik.errors.contrasena : ""}
            InputProps={{
              endAdornment: <InputAdornment position="end"><KeyIcon /></InputAdornment>,
            }}
            sx={{
              marginTop: 3,
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contrasena}
            variant="standard"
          />
          <div className="flex justify-center align-center">
            <Button
              size="large"
              sx={{
                marginTop: 3,
                textTransform: "none",
              }}
              variant="contained"
              type="submit"
              disabled={!formik.isValid || !formik.values.contrasena || !formik.values.email}
            >
              Ingresar
            </Button>
          </div>
        </form>
        <NavLink
          to="/register"
        >
          <Typography gutterBottom component="div" color="primary" sx={{ marginTop: 3, textAlign: "center", fontWeight: 500 }}>
            Todavía no tengo una cuenta
          </Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
