import React from "react";

const Message = ({ mensaje }) => {
  return (
    <div className="message Owner">
      <div className="messageInfo">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY264_CR16,0,178,264_AL_.jpg"
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{mensaje.contenido}</p>
        {/* <img
          src="https://m.media-amazon.com/images/I/31yqYjsAi6L._AC_SY1000_.jpg"
          alt=""
        /> */}
      </div>
    </div>
  );
};

export default Message;
