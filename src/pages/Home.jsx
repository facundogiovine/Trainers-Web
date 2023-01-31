import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Entrenador from "../model/Entrenador";
import EntrenadorContext from '../components/EntrenadorContext'

const Home = ({setIsAuthenticated}) => {
  const {entrenador} = useContext(EntrenadorContext);
  return (
    <div className="home">
      <div className="container">
        <Sidebar  setIsAuthenticated={setIsAuthenticated} />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
