import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a User!" />
      </div>
      <div className="userChat">
        <img src="https://m.media-amazon.com/images/M/MV5BMTI3MDc4NzUyMV5BMl5BanBnXkFtZTcwMTQyMTc5MQ@@._V1_UY264_CR16,0,178,264_AL_.jpg" />
        <div className="userChatInfo">
          <span>Sum Ting</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
