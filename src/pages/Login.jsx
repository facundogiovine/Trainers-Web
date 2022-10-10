import React,  { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../components/FontAwesomeIcons';
import logo from "../images/logo.png";
const Login = () => {
    return (
    <div className="formContainer">
      <div className="formWrapper">
        <img src={logo} className="logo"></img>
        <form >
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Log in!</button>
          {/* {err && <span>Something went wrong</span>} */}
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
