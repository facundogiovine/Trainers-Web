import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Entrenador from "../model/Entrenador";
import EntrenadorContext from '../components/EntrenadorContext'

const Home = ({ setIsAuthenticated }) => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  return (
    <div className="home">
      <div className="container">
        <Sidebar
          clienteSeleccionado={clienteSeleccionado}
          setIsAuthenticated={setIsAuthenticated}
          setClienteSeleccionado={setClienteSeleccionado}
        />
        <Chat
          clienteSeleccionado={clienteSeleccionado}
        />
      </div>
    </div>
  );
};

export default Home;
