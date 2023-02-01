import React from "react";
import Input from "./Input";
import Messages from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ clienteSeleccionado = {} }) => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{clienteSeleccionado?.nombreMostrado}</span>
        <div className="chatIcons">
          <FontAwesomeIcon icon={faEllipsisH} className="icons" />
        </div>
      </div>
      <Messages clienteSeleccionado={clienteSeleccionado} />
      <Input />
    </div>
  );
};

export default Chat;
