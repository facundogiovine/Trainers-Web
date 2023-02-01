import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { obtenerEntrenador, obtenerFechaIso } from "../utils/utils";
import SocketContext from "./SocketContext";

const Input = ({ messageList, setMessageList, clienteSeleccionado }) => {
  const { socket } = useContext(SocketContext)
  const [messageToSend, setMessageToSend] = useState("");

  let entrenador = obtenerEntrenador();

  const handleMessageChange = (event) => {
    setMessageToSend(event.target.value);
  };

  const sendMessage = () => {
    if (messageToSend) {
      const message = {
        senderId: entrenador.id,
        recipientId: clienteSeleccionado?.id,
        tipo: "TEXT",
        contenido: messageToSend,
        fecha: obtenerFechaIso()
      };
      socket.send(JSON.stringify(message));
      setMessageToSend("");
      setMessageList({ ...messageList, data: [...messageList.data, message] })
    }
  };

  return (
    <div className="input">
      <input
        name="messageToSend"
        type="text"
        placeholder="Type something..."
        value={messageToSend || ""}
        onChange={handleMessageChange}
      />
      <div className="send">
        <button name="sendMessage" onClick={sendMessage} style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default Input;
