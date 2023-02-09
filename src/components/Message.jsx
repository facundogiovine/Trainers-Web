import React from "react";
import useIntl from 'react-intl';
import { obtenerEntrenador } from "../utils/utils";

const Message = ({ mensaje, clienteSeleccionado }) => {

  let entrenador = obtenerEntrenador();

  let formattedDate = mensaje.fecha;
  const date = new Date(mensaje.fecha);
  if (isFinite(date)) {
    const currentDate = new Date();
    if (date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
      formattedDate = new Intl.DateTimeFormat(undefined, {
        timezone: 'UTC',
        hour: "2-digit",
        minute: "2-digit"
      }).format(date);
    } else {
      formattedDate = new Intl.DateTimeFormat(undefined, {
        timeZone: 'UTC',
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(date);
    }
  }
  return (
    <div className={`message ${String(mensaje.senderId) === String(entrenador.id) ? 'Owner' : 'NotOwner'}`}>
      <div className="messageInfo">
        <div className="profilePicture" >
          {String(mensaje.senderId) === String(entrenador.id) ? entrenador?.nombres.charAt(0) + entrenador?.apelidos.charAt(0) : clienteSeleccionado?.nombres.charAt(0) + clienteSeleccionado?.apellidos.charAt(0)}
        </div>
      </div>
      <div className="messageContent">
        <p className="messageTexto">
          {mensaje.contenido}
        </p>
        <span className="messageFecha">{formattedDate}</span>
      </div>
    </div>
  );
};

export default Message;
