import React from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import BackendAdapter from "../adapters/BackendAdapter";
import "../styles/Chat.css";
import "../styles/ChatroomList.css";
import { connect } from 'react-redux'
import actionTypes from "../redux/reducers/actionTypes";


const ChatroomList = ({
  handleClick,
  setMainDisplay,
  mainDisplay,
  chatrooms,
  selectedChatroom
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
        {chatrooms
          ? chatrooms.map(room => (
              <div
                key={room.id}
                onClick={e => handleClick(room.id)}
                className={(selectedChatroom === room.id && mainDisplay === "Chatroom") ? "active" : null}
              >
                <p><Icon name="chat"/>{room.name}</p>
                {/* <Button
                onClick={e => handleDeleteButtonClick(e, room)}
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

const mapStateToProps = state => ({
  chatrooms: state.chatroomsStore.chatrooms,
  selectedChatroom: state.chatroomsStore.selectedChatroom,
})

const mapDispatchToProps = dispatch => ({
  handleClick: id => dispatch({type: actionTypes.SELECT_CHATROOM, selectedChatroomId: id})
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatroomList)