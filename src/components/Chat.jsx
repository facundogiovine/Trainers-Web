import React, { useState } from "react";
import Input from "./Input";
import Messages from "./Messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ clienteSeleccionado = {} }) => {
  const [messageList, setMessageList] = useState({ data: [] });

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{clienteSeleccionado?.nombreMostrado}</span>
        <div className="chatIcons">
          {/* <FontAwesomeIcon icon={faEllipsisH} className="icons" /> */}
        </div>
      </div>
      <Messages messageList={messageList}
        setMessageList={setMessageList}
        clienteSeleccionado={clienteSeleccionado} />
      <Input messageList={messageList}
        setMessageList={setMessageList}
        clienteSeleccionado={clienteSeleccionado} />
    </div>
  );
};

export default Chat;
