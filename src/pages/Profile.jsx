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
import Divider from "@mui/material/Divider";

const Profile = ({}) => {
  
  return (
    <div className="flex items-center justify-center h-screen bg-blue-theme-200">
      <div className="shadow-xl rounded-lg p-6 bg-white object-contain">
        <div className="w-full flex justify-center align-center">
          <img src={logo} className="mb-3 w-60 h-auto"></img>
        </div>
        <Typography variant="h4" gutterBottom component="div" color="primary" sx={{ textAlign: "center", fontWeight: 500 }}>
          Facundo Giovine
        </Typography>
        <Divider color="primary"/>
        <Typography variant="body1" gutterBottom component="div" color="textPrimary" sx={{ textAlign: "left" }}>
          Correo electrónico: facundo@gmail.com
        </Typography>
        <Typography variant="body1" gutterBottom component="div" color="textPrimary" sx={{ textAlign: "left" }}>
          Fecha de nacimiento: 23/03/2000
        </Typography>
        <Typography variant="body1" gutterBottom component="div" color="textPrimary" sx={{ textAlign: "left" }}>
          Capacidad de clientes: 5
        </Typography>
        <Typography variant="body1" gutterBottom component="div" color="textPrimary" sx={{ textAlign: "left" }}>
          Calificación: 3.0
        </Typography>
        <Typography variant="body1" gutterBottom component="div" color="textPrimary" sx={{ textAlign: "left" }}>
          Descripción: Soy entrenador y entreno en un gimnasio!
        </Typography>

        <NavLink
          to="/"
        >
          <Typography gutterBottom component="div" color="primary" sx={{ marginTop: 3, textAlign: "center", fontWeight: 500 }}>
           Volver
          </Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default Profile;
