import React from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import BackendAdapter from "../adapters/BackendAdapter";
import "../styles/Chat.css";
import "../styles/ChatroomList.css";

const ChatroomList = ({
  channels,
  handleClick,
  selectedChannel,
  setMainDisplay,
  mainDisplay
}) => {
  const handleDeleteButtonClick = (e, channel) => {
    e.stopPropagation();
    BackendAdapter.deleteChatroom(channel.id);
  };

  return (
    <div>
      <div
        className={
          mainDisplay === "NewChatroom" ? "add-chat active" : "add-chat"
        }
        onClick={() => setMainDisplay("NewChatroom")}
      >
        <p>+ New Chatroom</p>
      </div>
      <Header as="h4" className="chatrooms-title">
        Chatrooms
      </Header>

      <div className="chatroom-list">
        {channels
          ? channels.map(channel => (
              <div
                key={channel.id}
                onClick={e => handleClick(channel.id)}
                className={(selectedChannel === channel.id && mainDisplay === "Chatroom") ? "active" : null}
              >
                <p><Icon name="chat"/>{channel.name}</p>
                {/* <Button
                onClick={e => handleDeleteButtonClick(e, channel)}
                className="channel-del-btn"
              >
                -
              </Button> */}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ChatroomList;
