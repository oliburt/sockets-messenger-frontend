import React from "react";
import Conversation from "../components/Conversation";
import MessageForm from "../components/MessageForm";
import { connect } from 'react-redux'
import { isChatroomInUserChatrooms } from "../helpers/helperFunctions";


const MessagingContainer = ({ selectedChatroom, user, userChatrooms }) => {
  return (
    <div className="messaging-container">
      <Conversation chatroom={selectedChatroom} currentUser={user} />
      {user && selectedChatroom && isChatroomInUserChatrooms(userChatrooms, selectedChatroom) ? (
        <MessageForm selectedChatroomId={selectedChatroom.id} user={user} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.userStore.user,
  selectedChatroom: state.chatroomsStore.selectedChatroom,
  userChatrooms: state.chatroomsStore.userChatrooms
})


export default connect(mapStateToProps)(MessagingContainer)
