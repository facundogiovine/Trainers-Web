import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
const Sidebar = ({ entrenador, setIsAuthenticated, setClienteSeleccionado }) => {


  useEffect(() => {

  }, []);

  return (
    <div className="sidebar">
      <Navbar entrenador={entrenador} setIsAuthenticated={setIsAuthenticated} />
      <Search />
      <Chats setClienteSeleccionado={setClienteSeleccionado} />
    </div>
  );
};

export default Sidebar;
