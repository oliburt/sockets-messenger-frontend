import React from "react";
import ChatroomList from "../components/ChatroomList";
import '../styles/Chat.css'
import Admin from "../components/Admin";

const SideBar = ({channels, handleChannelClick, selectedChannel, user}) => {
  return (
    <div className="sidebar">
      <Admin currentUser={user} /> 
      <ChatroomList
        channels={channels}
        handleClick={handleChannelClick}
        selectedChannel={selectedChannel}
      />
      <div>dms</div>
    </div>
  );
};

export default SideBar;
