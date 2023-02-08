import React, { useState } from "react";
import Input from "./Input";
import Messages from "./Messages";
import ClienteWindows from "./ClienteWindows";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ clienteSeleccionado = {} }) => {
  const [messageList, setMessageList] = useState({ data: [] });
  const [showClienteWindows, setShowClienteWindows] = useState(false);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{clienteSeleccionado?.nombreMostrado}</span>
        {clienteSeleccionado && (
          <div className="chatIcons">
            <FontAwesomeIcon icon={faEllipsisH} className="icons" onClick={() => setShowClienteWindows(true)} />
          </div>
        )}
      </div>
      <Messages messageList={messageList}
        setMessageList={setMessageList}
        clienteSeleccionado={clienteSeleccionado} />
      <Input messageList={messageList}
        setMessageList={setMessageList}
        clienteSeleccionado={clienteSeleccionado} />
        {showClienteWindows && (
        <ClienteWindows
        close={() => setShowClienteWindows(false)}
        clienteSeleccionado={clienteSeleccionado}
      />
      )}
    </div>
  );
};

export default Chat;
