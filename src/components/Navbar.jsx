import React, { useContext, useState } from 'react';
import logo from "../images/logo.png";
import Cookies from 'js-cookie';
import { obtenerEntrenador } from '../utils/utils';
import Profile from '../pages/Profile';

const Navbar = ({ setIsAuthenticated }) => {
  const [showProfile, setShowProfile] = useState(false);
  let entrenador = obtenerEntrenador();

  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove('IsAuthenticated');
    Cookies.remove('entrenador');
  };

  const openProfile = () => {
    //Open Profile
  };

  return (
    <div className="navbar">
      <div className="user" onClick={openProfile}>
        <div className="profilePicture" >
          {entrenador?.nombres.charAt(0) + entrenador?.apelidos.charAt(0)}
        </div>
        <span className='entrenadorName'>{entrenador?.nombreMostrado}</span>
      </div>
      <button className="button is-large font-bold" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Navbar;
