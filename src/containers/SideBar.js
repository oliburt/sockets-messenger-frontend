import React from "react";
import ChannelList from "../components/ChannelList";
import '../styles/Chat.css'

const SideBar = ({channels, handleChannelClick, selectedChannel}) => {
  return (
    <div className="sidebar">
      <div>Login etc...</div>
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
