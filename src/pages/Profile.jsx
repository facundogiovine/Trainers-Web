import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { Select, InputLabel, MenuItem } from "@mui/material";
import { obtenerEntrenador } from "../utils/utils";

const Profile = () => {
  const entrenador = obtenerEntrenador();

  return (
    <div className="flex items-center justify-center h-screen bg-blue-theme-200">
      <div className="shadow-xl rounded-lg p-6 bg-white object-contain">
        <div className="w-full flex justify-center align-center">
          <img src={logo} className="mb-3 w-60 h-auto"></img>
        </div>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          color="primary"
          sx={{ textAlign: "center", fontWeight: 500 }}
        >
          {entrenador.nombreMostrado}
        </Typography>
        <Divider color="primary" />
        <div className="flex flex-col gap-2">
          <div>
            <InputLabel variant="body1" component="span"  sx={{ fontWeight: "bold" }}>
              Correo electrónico:
            </InputLabel>{" "}
            <Typography variant="body1" component="span" color="textPrimary">
              {entrenador.email}
            </Typography>
          </div>
          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Fecha de nacimiento:
            </InputLabel>{" "}
            <Typography variant="body1" component="span" color="textPrimary">
              {entrenador.fechaNacimiento}
            </Typography>
          </div>
          <div>
            <InputLabel variant="body1" component="span"  sx={{ fontWeight: "bold" }}>
              Capacidad de clientes:
            </InputLabel>{" "}
            <Typography variant="body1" component="span" color="textPrimary">
              {entrenador.capacidadClientes}
            </Typography>
          </div>
          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Calificación:
            </InputLabel>{" "}
            <Typography variant="body1" component="span" color="textPrimary">
              {entrenador.calificacion}
            </Typography>
          </div>
          <div>
          <InputLabel id="sexo-biologico">Sexo Biológico</InputLabel>
              <Select
                labelId="sexo-biologico"
                name="sexo"
                value="1"
                label="Sexo Biológico"
              >
                  <MenuItem key="1" value="Test">
                    Las Palabras
                  </MenuItem>
              </Select>
          </div>
        </div>
        <NavLink to="/">
          <Typography
            gutterBottom
            component="div"
            color="primary"
            sx={{ marginTop: 3, textAlign: "center", fontWeight: 500 }}
          >
            Volver
          </Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default Profile;
