import React, { useContext, useState, useEffect } from 'react';
import logo from "../images/logo.png";
import Cookies from 'js-cookie';
import { Button, Typography, Divider, Avatar, InputLabel } from "@mui/material";
import { obtenerEntrenador } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setIsAuthenticated }) => {
  const [entrenadorPfp, setEntrenadorPfp] = useState(null);
  let entrenador = obtenerEntrenador();
  console.log(entrenador)
  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove('IsAuthenticated');
    Cookies.remove('entrenador');
  };
  const navigate = useNavigate();
  const openProfile = () => {
    navigate('/profile');
  };

  useEffect(() => {
    async function fetchEntrenadorPfp() {
      const response = await fetch(`http://localhost:8080/api/v1/imagen/imagen?idPersona=${entrenador.id}&tipoPersona=ENTRENADOR&tipoImagen=FOTO_PERFIL`);
      const data = await response.json();
      const { base64 } = data;
      setEntrenadorPfp(base64);
    }

    fetchEntrenadorPfp();
  }, [entrenador.id]);

  return (
    <div className="navbar">
      <div className="user" onClick={openProfile}>
        {entrenadorPfp ? (
          <Avatar
            alt=""
            src={`data:image/png;base64,${entrenadorPfp}`}
            sx={{ width: '40px', height: '40px', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer' }}
          />
        ) : (
          <div className="profilePicture">
            {entrenador?.nombres.charAt(0) + entrenador?.apellidos.charAt(0)}
          </div>
        )}
        <span className='entrenadorName'>{entrenador?.nombreMostrado}</span>
      </div>
      <button className="button is-large font-bold" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Navbar;
