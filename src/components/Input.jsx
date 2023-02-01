import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import EntrenadorContext from "../components/EntrenadorContext";

let socket;

const Input = () => {
  const {entrenador} = useContext(EntrenadorContext);
  const [messageToSend, setMessageToSend] = useState("");
  socket = new WebSocket(`ws://localhost:80/chat?senderId=${entrenador.id}?recipientId=2`);


  const handleMessageChange = (event) => {
    setMessageToSend(event.target.value);
  };

  const sendMessage = () => {
    if (messageToSend) {
      const message = {
        senderId: entrenador.id,
        recipientId: "2",
        tipo: "TEXT",
        contenido: messageToSend,
        fecha: new Date().toISOString()
    };
    socket.send(JSON.stringify(message));
    setMessageToSend("");
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
        <button name="sendMessage" onClick={sendMessage} style={{cursor: 'pointer'}}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default Input;
