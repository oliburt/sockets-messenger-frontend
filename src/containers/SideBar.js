import React from "react";
import ChannelList from "../components/ChannelList";
import '../styles/Chat.css'
import Admin from "../components/Admin";

const SideBar = ({channels, handleChannelClick, selectedChannel, user}) => {
  return (
    <div className="sidebar">
      <Admin currentUser={user} /> 
      <ChannelList
        channels={channels}
        handleClick={handleChannelClick}
        selectedChannel={selectedChannel}
      />
      <div>dms</div>
    </div>
  );
};

export default SideBar;
