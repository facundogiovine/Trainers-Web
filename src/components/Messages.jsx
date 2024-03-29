import React, { useContext, useEffect, useState } from "react";
import { obtenerEntrenador } from "../utils/utils";
import SocketContext from "./SocketContext";
import Message from "./Message";

const Messages = ({ messageList, setMessageList, clienteSeleccionado }) => {
  const { socket, setSocket } = useContext(SocketContext);
  //const [messageList, setMessageList] = useState({ data: [] });

  let entrenador = obtenerEntrenador();
  let messagesEnd;

  const getMessageList = async () => {
    setMessageList({ ...messageList, loading: true });

    let response = await fetch(`http://localhost:8080/api/v1/chat/mensajes?senderId=${entrenador?.id}&recipientId=${clienteSeleccionado?.id}`);
    let mensajes = await response.json().catch([]) || [];

    mensajes = mensajes.map(mensaje => {
      let date = new Date(mensaje.fecha);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      if (!isFinite(date)) {
        console.error("Invalid date:", mensaje.fecha);
        return mensaje;
      }
      let formattedDate;
      const currentDate = new Date();
      if (date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
        formattedDate = new Intl.DateTimeFormat(undefined, {
          timeZone: 'America/Asuncion',
          hour: "2-digit",
          minute: "2-digit"
        }).format(date);
      } else {
        formattedDate = new Intl.DateTimeFormat(undefined, {
          timeZone: 'America/Asuncion',
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).format(date);
      }
      mensaje.fecha = formattedDate;
      return mensaje;
    });

    setMessageList({ ...messageList, loading: true, data: mensajes.reverse() });
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
        return (<Message key={index} mensaje={mensaje} clienteSeleccionado={clienteSeleccionado} />);
      }) : null}
      <div style={{ float: "left", clear: "both" }}
        ref={(el) => { messagesEnd = el; }}>
      </div>
    </div>

  );
};

export default Messages;
