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
  user
}) => {

  const handleClick = id => {
    const chatroom = usersChatrooms.find(room => room.id === id)
    setSelectedChatroom(chatroom)
    setMainDisplay("Chatroom")
  }

  return (
    <div>
      
      <Header as="h4" className="chatrooms-title">
        My Chatrooms
      </Header>

      <div className="chatroom-list">
        {usersChatrooms
          ? usersChatrooms.map(room => (
              <div
                key={room.id}
                onClick={e => handleClick(room.id)}
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
  user: state.userStore.user
})

const mapDispatchToProps = dispatch => ({
  setSelectedChatroom: chatroom => dispatch({type: actionTypes.SELECT_CHATROOM, chatroom}),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomList)