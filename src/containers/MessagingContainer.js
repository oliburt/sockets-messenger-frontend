import React from "react";
import Conversation from "../components/Conversation";
import MessageForm from "../components/MessageForm";

const MessagingContainer = ({ conversation, selectedChannel, user }) => {
  return (
    <div className="messaging-container">
      <Conversation conversation={conversation} currentUser={user} />
      {selectedChannel ? (
        <MessageForm selectedChannel={selectedChannel} user={user} />
      ) : null}
    </div>
  );
};

export default MessagingContainer;
