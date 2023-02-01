import React from "react";
import useIntl from 'react-intl';
import { obtenerEntrenador } from "../utils/utils";

const Message = ({ mensaje }) => {
  console.log(mensaje);
  const date = new Date(mensaje.fecha);
  const options = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
  const fechaFormatted = new Intl.DateTimeFormat('es-PY', options).format(date);

  let entrenador = obtenerEntrenador();
  const isOwner = mensaje.senderId === entrenador.id;
  const messageOwnership = `message ${isOwner ? 'Owner' : 'NotOwner'}`;

  return (
    <div className={messageOwnership}>
      <div className="messageInfo">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY264_CR16,0,178,264_AL_.jpg"
          alt=""
        />
        <span>{fechaFormatted}</span>
      </div>
      <div className="messageContent">
        <p>{mensaje.contenido}</p>
      </div>
    </div>
  );
};

export default Message;
