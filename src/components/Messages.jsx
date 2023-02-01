import React, { useContext, useEffect, useState } from "react";
import { obtenerEntrenador } from "../utils/utils";
import SocketContext from "./SocketContext";
import Message from "./Message";

const Messages = ({ clienteSeleccionado }) => {
  const { socket, setSocket } = useContext(SocketContext);
  const [messageList, setMessageList] = useState({ data: [] });

  let entrenador = obtenerEntrenador();
  let messagesEnd;

  const getMessageList = async () => {
    setMessageList({ ...messageList, loading: true });

    let response = await fetch(`http://localhost:8080/api/v1/chat/mensajes?senderId=${entrenador?.id}&recipientId=${clienteSeleccionado?.id}`);
    let mensajes = await response.json().catch([]) || [];


    setMessageList({ ...messageList, loading: true, data: mensajes });
  }

  const connectWebSocket = () => {
    let socketConnection = new WebSocket(`ws://localhost:80/chat?senderId=${entrenador?.id}?recipientId=${clienteSeleccionado?.id}`);
    setSocket(socketConnection);
  }

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    getMessageList();
    if (clienteSeleccionado?.id) {
      connectWebSocket();
    }
  }, [clienteSeleccionado]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  if (socket) {
    socket.onmessage = message => {
      const receivedMessage = JSON.parse(message.data);
      setMessageList({ ...messageList, data: [...messageList?.data || [], receivedMessage] });
      console.log("Message received:", receivedMessage);
    };
  }


  return (
    <div className="messages">
      {messageList ? messageList.data.map((mensaje, index) => {
        return (<Message key={index} mensaje={mensaje} />);
      }) : null}
      <div style={{ float: "left", clear: "both" }}
        ref={(el) => { messagesEnd = el; }}>
      </div>
    </div>

  );
};

export default Messages;
