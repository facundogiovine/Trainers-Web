import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import "../components/FontAwesomeIcons";
import logo from "../images/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup"
import KeyIcon from "@mui/icons-material/Key";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = ({}) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", contrasenaRegistro: "", confirmarContrasena: "" },
    validationSchema: Yup.object({
      email: Yup.string()
      .required("Ingrese un correo electrónico.")
      .email("Ingrese un correo válido.")
      .test(
        "emailExists",
        "El correo ya está en uso.",
        async (value) => {
          const response = await fetch(
            "http://localhost:8080/api/v1/entrenador/entrenadores"
          );
          const entrenadores = await response.json();
          return !entrenadores.some(
            (entrenador) =>
              entrenador.email.toLowerCase() === value.toLowerCase()
          );
        }
      ),
      contrasenaRegistro: Yup.string().required("Ingrese su contraseña."),
      confirmarContrasena: Yup.string().when("contrasenaRegistro", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("contrasenaRegistro")],
          "Las contraseñas no coinciden"
        )
      })
      .required("Confirme su contraseña."),
    }),
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
  error={
    (formik.errors.email && formik.touched.email) ||
    (formik.errors.emailExists && formik.touched.email)
  }
  helperText={
    formik.touched.email
      ? formik.errors.email || formik.errors.emailExists
      : ""
  }
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <AlternateEmailIcon />
      </InputAdornment>
    ),
  }}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.email}
  variant="standard"
/>
          <TextField
            name="contrasenaRegistro"
            label="Contraseña"
            type="password"
            fullWidth
            error={formik.errors.contrasenaRegistro && formik.touched.contrasenaRegistro}
            helperText={formik.touched.contrasenaRegistro ? formik.errors.contrasenaRegistro : ""}
            InputProps={{
              endAdornment: <InputAdornment position="end"><KeyIcon /></InputAdornment>,
            }}
            sx={{
              marginTop: 3,
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contrasenaRegistro}
            variant="standard"
          />
          <TextField
            name="confirmarContrasena"
            label="Confirmar Contraseña"
            type="password"
            fullWidth
            error={formik.errors.confirmarContrasena && formik.touched.confirmarContrasena}
            helperText={formik.touched.confirmarContrasena ? formik.errors.confirmarContrasena : ""}
            InputProps={{
              endAdornment: <InputAdornment position="end"><KeyIcon /></InputAdornment>,
            }}
            sx={{
              marginTop: 3,
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmarContrasena}
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
              disabled={!formik.isValid || !formik.values.email || !formik.values.contrasenaRegistro || !formik.values.confirmarContrasena}
              onClick={() => {
                fetch("http://localhost:8080/api/v1/entrenador/entrenadores")
                  .then(response => response.json())
                  .then(data => {
                    const entrenadores = data;
                    console.log(entrenadores)
                    const emailExists = entrenadores.some(entrenador => entrenador.email.toLowerCase() === formik.values.email.toLowerCase());
                    if (!emailExists) {
                      navigate("/register/data", { state: { email: formik.values.email, password: formik.values.contrasenaRegistro } });
                    }
                  })
                  .catch(error => console.error(error));
              }}
              
            >
              Empezar
            </Button>
          </div>
        </form>
        <NavLink
          to="/"
        >
          <Typography gutterBottom component="div" color="primary" sx={{ marginTop: 3, textAlign: "center", fontWeight: 500 }}>
            Ya tengo una cuenta
          </Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
