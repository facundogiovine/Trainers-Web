import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import RegisterData from './RegisterData';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import EntrenadorContext from '../components/EntrenadorContext'

const Views = ({ isAuthenticated, setIsAuthenticated }) => {
  const { entrenador } = useContext(EntrenadorContext);
  return (
    <Routes>
      <Route path="/" element={isAuthenticated && entrenador ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={isAuthenticated && entrenador ? <Profile setIsAuthenticated={setIsAuthenticated} /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register/data" element={<RegisterData />} />
      <Route path="*" element={isAuthenticated && entrenador ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
    </Routes>
  );
}

export default Views;