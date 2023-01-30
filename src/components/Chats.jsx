import React, { useContext, useEffect, useState } from "react";
import EntrenadorContext from "./EntrenadorContext.jsx";

const Chats = () => {

  const [clientList, setClientList] = useState({ data: [] });

  const { entrenador } = useContext(EntrenadorContext);



  const getClientList = async () => {
    setClientList({ ...clientList, loading: true });

    // console.log(entrenador.id);

    let response = await fetch(`http://localhost:8080/api/v1/match/matchesCliente/${entrenador.id}`);
    let list = await response.json();


    console.log(list);

  }

  useEffect(() => {
    getClientList();
  }, []);


  return (
    <div className="chats">
      <div className="userChat">
        <img src="https://m.media-amazon.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY264_CR16,0,178,264_AL_.jpg" />
        <div className="userChatInfo">
          <span>Sum Ting</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src="https://m.media-amazon.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY264_CR16,0,178,264_AL_.jpg" />
        <div className="userChatInfo">
          <span>Sum Ting</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src="https://m.media-amazon.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY264_CR16,0,178,264_AL_.jpg" />
        <div className="userChatInfo">
          <span>Sum Ting</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src="https://m.media-amazon.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY264_CR16,0,178,264_AL_.jpg" />
        <div className="userChatInfo">
          <span>Sum Ting</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Chats;
