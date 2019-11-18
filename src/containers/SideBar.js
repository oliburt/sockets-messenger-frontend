import React from "react";
import ChatroomList from "../components/ChatroomList";
import "../styles/Chat.css";
import Admin from "../components/Admin";

const SideBar = ({
  channels,
  handleChannelClick,
  selectedChannel,
  user,
  setMainDisplay,
  logout
}) => {
  return (
    <div className="sidebar">
      <Admin currentUser={user} logout={logout} />
      <ChatroomList
        channels={channels}
        handleClick={handleChannelClick}
        selectedChannel={selectedChannel}
        setMainDisplay={setMainDisplay}
      />
    </div>
  );
};

export default SideBar;
