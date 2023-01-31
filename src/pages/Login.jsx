import React, { useContext, useState } from "react";
import { useNavigate, Link, Form } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/FontAwesomeIcons";
import logo from "../images/logo.png";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import { Entrenador } from "../model/Entrenador";
import * as Yup from "yup"
import Cookies from 'js-cookie';
import EntrenadorContext from "../components/EntrenadorContext";


const Login = ({ setIsAuthenticated }) => {

  const { setEntrenador } = useContext(EntrenadorContext);

  const formik = useFormik({
    initialValues: { email: "", contrasena: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Ingrese un correo electronico."),
      contrasena: Yup.string().required("Ingrese su contrasena."),
    }),
    onSubmit: async (values, actions) => {
      actions.resetForm();
      let response = await fetch("http://localhost:8080/api/v1/auth/autenticar/entrenador", { method: "POST", body: JSON.stringify(values, null, 2), headers: { "Content-Type": "application/json" } }); //Autentica al usuario
      let authResponse = await response.json();
      if (authResponse.autenticado) {
        let datosPromise = await fetch(`http://localhost:8080/api/v1/entrenador/entrenador/${authResponse.id}`); //Si el autenticado funciona, recibo la data entera del usuario
        let datosResponse = await datosPromise.json();
        let entrenador = new Entrenador(datosResponse.id, datosResponse.descripcion, datosResponse.calificacion, datosResponse.experiencia, datosResponse.latitud, datosResponse.longitud, datosResponse.activo, datosResponse.nombres, datosResponse.apellidos, datosResponse.nombreMostrado, datosResponse.fechaNacimiento);
        setIsAuthenticated(true);
        Cookies.set('IsAuthenticated', true);
        Cookies.set('entrenador', JSON.stringify(entrenador));
        setEntrenador(entrenador);
        console.log(EntrenadorContext);

      }
    },
  });

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img src={logo} className="logo"></img>

        <form onSubmit={formik.handleSubmit}  >
          <FormControl isInvalid={formik.errors.email && formik.touched.email}>
            <input name="email" placeholder="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
            <FormErrorMessage color={"red"}>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.errors.contrasena && formik.touched.contrasena}>
            <input name="contrasena" type="password" placeholder="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contrasena} />
            <FormErrorMessage color={"red"}> {formik.errors.contrasena}</FormErrorMessage>
          </FormControl>

          <button type="submit">Log in!</button>

        </form>

      </div>
    </div>
  );
};

export default Login;
