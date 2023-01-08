import React, { useState } from "react";
import { useNavigate, Link, Form } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/FontAwesomeIcons";
import logo from "../images/logo.png";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import { Entrenador } from "../model/Entrenador";
import * as Yup from "yup"
const Login = () => {
  const formik = useFormik({
    initialValues: { email: "", contrasena: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Ingrese un correo electronico."),
      contrasena: Yup.string().required("Ingrese su contrasena."),
    }),
    onSubmit: (values, actions) => {
      // alert(JSON.stringify(values, null, 2));
      // console.log(values);
      actions.resetForm();
      let response;
      fetch("http://localhost:8080/api/v1/auth/autenticar/entrenador", { method: "POST", body: JSON.stringify(values, null, 2), headers: { "Content-Type": "application/json" } }).then(response => response.json()).then(response => responseHandler(response)).then(entrenador => console.log(entrenador));
      // if (response) {
      //   let entrenador = responseHandler(response);

      //   console.log(entrenador);
      // }
    },
  });

  const responseHandler = (response) => {
    let entrenador;
    if (response.autenticado) {
      let id = response.id;

      fetch(`http://localhost:8080/api/v1/entrenador/entrenador/${id}`).then((response) => response.json()).then(r =>{ entrenador = new Entrenador(r.id, r.descripcion, r.calificacion, r.experiencia, r.latitud, r.longitud, r.activo, r.nombres, r.apellidos, r.nombreMostrado, r.fechaNacimiento); return entrenador}
      ).then(e => { entrenador = e });

    }
    console.log(entrenador);
    return entrenador;
  }
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
