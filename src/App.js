import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './components/FontAwesomeIcons'
import './style.scss';
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Views from "./pages/Views"
import logo from "./images/logo.png"
import Cookies from 'js-cookie';
//import { EntrenadorContext } from './index';

function App() {
  
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authCookie = Cookies.get('IsAuthenticated');
    if (authCookie) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Views isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
  );
}

export default App;
