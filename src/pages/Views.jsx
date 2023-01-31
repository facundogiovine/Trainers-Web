import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import TestWS from './TestWS';
//import { EntrenadorContext } from '../index.js'

const Views = ({ isAuthenticated, setIsAuthenticated }) => {
  //const entrenador = useContext(EntrenadorContext);
  return (
    <Routes> 
        <Route path="/" element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/testws" element={<TestWS />} />
        <Route path="*" element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
    </Routes>
  );
}

export default Views;