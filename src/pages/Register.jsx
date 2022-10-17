import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/FontAwesomeIcons";
import logo from "../images/logo.png";
const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img src={logo} className="logo"></img>
        <form>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          {/* <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label> */}
          {/* <button disabled={loading}>Sign up</button> */}
          {/* {loading && "Uploading and compressing the image please wait..."} */}
          {/* {err && <span>Something went wrong</span>} */}
        </form>
        <p>
          You do have an account? <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
