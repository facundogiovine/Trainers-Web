import React, { useContext } from 'react';
import logo from "../images/logo.png";
import Cookies from 'js-cookie';
//import { EntrenadorContext } from '../index.js'
import Entrenador from "../model/Entrenador";
import EntrenadorContext from '../components/EntrenadorContext'

const Navbar = ({setIsAuthenticated}) => {
 const {entrenador} = useContext(EntrenadorContext);
  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove('IsAuthenticated');
  };
  return (
    <div className="navbar">
      {/* <img src={logo} alt="TRAINERS" className="logo" /> */}
      <div className="user">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY264_CR16,0,178,264_AL_.jpg"
          alt=""
          className="pfp"
        />
        <span>{entrenador.nombreMostrado}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
