import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Input from "./Input";
import Messages from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ clienteSeleccionado }) => {
  
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{clienteSeleccionado.nombreMostrado}</span>
        <div className="chatIcons">
          <FontAwesomeIcon icon={faEllipsisH} className="icons" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
