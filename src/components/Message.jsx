import React, { useState, useEffect } from "react";
import useIntl from 'react-intl';
import { obtenerEntrenador } from "../utils/utils";

const Message = ({ mensaje, clienteSeleccionado }) => {

  let entrenador = obtenerEntrenador();
  const [formattedDate, setFormattedDate] = useState(mensaje.fecha);
  
  useEffect(() => {
    const date = new Date(mensaje.fecha);
    if (isFinite(date)) {
      const currentDate = new Date();
      if (date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
        setFormattedDate(new Intl.DateTimeFormat(undefined, {
          timeZone: 'America/Asuncion',
          hour: "2-digit",
          minute: "2-digit"
        }).format(date));
      } else {
        setFormattedDate(new Intl.DateTimeFormat(undefined, {
          timeZone: 'America/Asuncion',
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        }).format(date));
      }
    }
  }, [mensaje.fecha]);

  return (
    <div className={`message ${String(mensaje.senderId) === String(entrenador.id) ? 'Owner' : 'NotOwner'}`}>
      <div className="messageInfo">
        {/* <div className="profilePicture" >
          {String(mensaje.senderId) === String(entrenador.id) ? entrenador?.nombres.charAt(0) + entrenador?.apellidos.charAt(0) : clienteSeleccionado?.nombres.charAt(0) + clienteSeleccionado?.apellidos.charAt(0)}
        </div> */}
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
