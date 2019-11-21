import React from "react";
import { Header, Icon } from "semantic-ui-react";
import "../styles/Chat.css";
import "../styles/ChatroomList.css";
import { connect } from 'react-redux'
import actionTypes from "../redux/reducers/actionTypes";


const ChatroomList = ({
  setMainDisplay,
  mainDisplay,
  usersChatrooms,
  selectedChatroom,
  setSelectedChatroom,
}) => {

  const handleClick = chatroom => {
    setSelectedChatroom(chatroom)
    setMainDisplay("Chatroom")
  }

  const publicUserChatrooms = usersChatrooms.filter(room => room.public)

  return (
    <div id="chatroom-list">
      
      <Header as="h4" className="chatrooms-title">
        My Chatrooms
      </Header>

      <div className="chatroom-list">
        {publicUserChatrooms
          ? publicUserChatrooms.map(room => (
              <div
                key={room.id}
                onClick={e => handleClick(room)}
                className={(selectedChatroom && selectedChatroom.id === room.id && mainDisplay === "Chatroom") ? "active" : null}
              >
                <p><Icon name="chat"/>{room.name}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  usersChatrooms: state.chatroomsStore.userChatrooms,
  selectedChatroom: state.chatroomsStore.selectedChatroom,
  user: state.userStore.user,
  mainDisplay: state.displayStore.mainDisplay
})

const mapDispatchToProps = dispatch => ({
  setSelectedChatroom: chatroom => dispatch({type: actionTypes.SELECT_CHATROOM, chatroom}),
  setMainDisplay: payload => dispatch({type: actionTypes.SET_MAIN_DISPLAY, payload})
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomList)