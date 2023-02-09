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
        <div className="profilePicture" >
          {entrenador?.nombres.charAt(0) + entrenador?.apelidos.charAt(0)}
        </div>
        <span className='entrenadorName'>{entrenador?.nombreMostrado}</span>
        <button className="button is-large font-bold" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Navbar;
