import React, { useContext } from 'react';
import logo from "../images/logo.png";
import Cookies from 'js-cookie';
import { obtenerEntrenador } from '../utils/utils';

const Navbar = ({ setIsAuthenticated }) => {
  let entrenador = obtenerEntrenador();

  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove('IsAuthenticated');
    Cookies.remove('entrenador');
  };
  return (
    <div className="navbar">
      <div className="user">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY264_CR16,0,178,264_AL_.jpg"
          alt=""
          className="pfp"
        />
        <span>{entrenador?.nombreMostrado}</span>
        <button className="button is-large font-bold" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Navbar;
