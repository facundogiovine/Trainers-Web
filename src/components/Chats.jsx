import React, { useContext, useEffect, useState } from "react";
import EntrenadorContext from "./EntrenadorContext.jsx";

const Chats = ({ setClienteSeleccionado }) => {

  const [clientList, setClientList] = useState({ data: [] });

  const { entrenador } = useContext(EntrenadorContext);


  const changeSelectedClient = index => {
    setClienteSeleccionado(clientList.data[index]);
  }

  const getClientList = async () => {
    setClientList({ ...clientList, loading: true });

    let response = await fetch(`http://localhost:8080/api/v1/match/matchesEntrenador/${entrenador.id}`);
    let list = await response.json().catch([]);

    setClientList({ ...clientList, loading: false, data: list });
  }

  useEffect(() => {
    getClientList();
  }, []);


  return (

    <div className="chats">
      {clientList.data.map((client, index) => {
        return (
          <div className="flex items-center cursor-pointer hover:bg-blue-theme-500" key={index} onClick={() => changeSelectedClient(index)}>
            <div className="rounded-full text-xl bg-sky-200 w-12 h-12 m-2 flex items-center justify-center" >
              {client.nombres.charAt(0)}{client.apellidos.charAt(0)}
            </div>
            <span>{client.nombreMostrado}</span>
          </div>
        )
      })}
    </div>
  );
};

export default Chats;
