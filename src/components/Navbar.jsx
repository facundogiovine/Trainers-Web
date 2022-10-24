import React from "react";
import logo from "../images/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="TRAINERS" className="logo" />
      <div className="user">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY264_CR16,0,178,264_AL_.jpg"
          alt=""
          className="pfp"
        />
        <span>John Doe</span>
        <button>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
