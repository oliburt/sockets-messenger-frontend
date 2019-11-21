import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../styles/Conversation.css";
import { Icon } from "semantic-ui-react";
import {
  isUserActive,
  formatDateTime,
  isChatroomInUserChatrooms
} from "../helpers/helperFunctions";
import { connect } from "react-redux";
import { addChatroomToUsersChatrooms } from "../redux/actions/userChatroomActions";

const Conversation = ({
  chatroom,
  currentUser,
  allUsers,
  addChatroomToUsersChatrooms,
  userChatrooms
}) => {
  const renderMessages = messages => {
    if (messages.length > 0)
      return messages.map(message => {
        return (
          <div
            key={message.id}
            className={
              currentUser && message.user.user_id === currentUser.id
                ? "message user"
                : "message"
            }
          >
            <p>{message.content}</p>
            <Icon
              name="user"
              size="small"
              color={isUserActive(allUsers, message.user) ? "green" : "red"}
            />
            <span className="name-span">{message.user.username} - </span>
            <span className="time-span">
              {formatDateTime(message.created_at)}
            </span>
          </div>
        );
      });

    return (
      <div id="no-messages">
        <p>No messages yet</p>
      </div>
    );
  };

  return chatroom ? (
    <div>
      <h2>{chatroom.name}</h2>
      {currentUser &&
      chatroom &&
      isChatroomInUserChatrooms(userChatrooms, chatroom) ? null : (
        <button
          id="add-my-chat-btn"
          onClick={() => addChatroomToUsersChatrooms(chatroom)}
        >
          + Add To My Chatrooms
        </button>
      )}
      <span id="chatroom-description">About: {chatroom.description}</span>
      <div className="message-area">
        <ScrollToBottom className="messages-container">
          {renderMessages(chatroom.messages)}
        </ScrollToBottom>
      </div>
    </div>
  ) : (
    <div className="empty-channel">
      <span>No chatroom selected</span>
    </div>
  );
};

const mapStateToProps = state => ({
  allUsers: state.userStore.allUsers,
  userChatrooms: state.chatroomsStore.userChatrooms
});

const mapDispatchToProps = dispatch => ({
  addChatroomToUsersChatrooms: chatroom =>
    dispatch(addChatroomToUsersChatrooms(chatroom))
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
