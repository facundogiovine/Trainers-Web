import React, { useContext } from 'react';
import logo from "../images/logo.png";
import Cookies from 'js-cookie';
import { obtenerEntrenador } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setIsAuthenticated }) => {
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

  return (
    <div className="navbar">
      <div className="user">
        <div className="profilePicture" onClick={openProfile}>
          {entrenador?.nombres.charAt(0) + entrenador?.apellidos.charAt(0)}
        </div>
        <span className='entrenadorName'>{entrenador?.nombreMostrado}</span>
      </div>
        <button className="button is-large font-bold" onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Navbar;
