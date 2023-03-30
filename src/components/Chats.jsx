import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { obtenerEntrenador } from "../utils/utils.js";
import { Avatar } from "@mui/material"

const Chats = ({ clienteSeleccionado, setClienteSeleccionado }) => {

  const [clientList, setClientList] = useState({ data: [] });

  let entrenador = obtenerEntrenador();

  const changeSelectedClient = index => {
    setClienteSeleccionado(clientList.data[index]);
  }

  const getClientList = async () => {
    setClientList({ ...clientList, loading: true });
    let response = await fetch(`http://localhost:8080/api/v1/match/matchesEntrenador/${entrenador?.id}`);
    let list = await response.json().catch([]) || [];
    setClientList({ ...clientList, loading: false, data: list });
  }

  useEffect(() => {
    getClientList();
  }, []);





  return (
    <div className="chats">
      {clientList.data.map((client, index) => {
        const getImage = async () => {
          const response = await fetch(`http://localhost:8080/api/v1/imagen/imagen?idPersona=${client.id}&tipoPersona=CLIENTE&tipoImagen=FOTO_PERFIL`);
          const data = await response.json();
          return data.base64;
        };
      
        const getImageData = async () => {
          const imageData = await getImage();
          console.log(imageData)
          return `data:image/png;base64,${imageData}`;
        };
        return (
          <div className={classNames("flex items-center cursor-pointer hover:bg-blue-theme-300 ", {
            "bg-blue-theme-500 hover:bg-blue-theme-500": clienteSeleccionado?.id === client.id,
          })} key={index} onClick={() => changeSelectedClient(index)}>
            <Avatar
              alt=""
              src={getImageData()}
              sx={{ width: "40px", height: "40px", marginLeft: 1, marginRight: 1, marginTop: 0.5, marginBottom: 0.5 }}
            />
            <span className="userName">{client.nombreMostrado}</span>
          </div>
        );
      })}

    </div>
  );
};

export default Chats;
