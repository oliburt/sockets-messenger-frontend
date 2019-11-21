import React from "react";
import { Header, Icon } from "semantic-ui-react";
import "../styles/Chat.css";
import "../styles/ChatroomList.css";
import { connect } from "react-redux";
import actionTypes from "../redux/reducers/actionTypes";
import { getDMUser, isUserActive } from "../helpers/helperFunctions";

const DMList = ({
  setMainDisplay,
  mainDisplay,
  usersChatrooms,
  selectedChatroom,
  setSelectedChatroom,
  currentUser,
  allUsers
}) => {
  const handleClick = chatroom => {
    setSelectedChatroom(chatroom);
    setMainDisplay("Chatroom");
  };

  const privateUserChatrooms = usersChatrooms.filter(room => !room.public);

  return (
    <div id="dm-list">
      <Header as="h4" className="chatrooms-title">
        Direct Messages
      </Header>

      <div className="chatroom-list">
        {privateUserChatrooms && privateUserChatrooms.length > 0
          ? privateUserChatrooms.map(room => (
              
              <div
                key={room.id}
                onClick={e => handleClick(room)}
                className={
                  selectedChatroom &&
                  selectedChatroom.id === room.id &&
                  mainDisplay === "Chatroom"
                    ? "active"
                    : null
                }
              >
                <p>
                  <Icon
                    name="user"
                    color={
                      isUserActive(allUsers, { user_id: getDMUser(room, allUsers, currentUser).id })
                        ? "green"
                        : "red"
                    }
                  />
                  {getDMUser(room, allUsers, currentUser).username}
                </p>
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
  currentUser: state.userStore.user,
  allUsers: state.userStore.allUsers,
  mainDisplay: state.displayStore.mainDisplay
});

const mapDispatchToProps = dispatch => ({
  setSelectedChatroom: chatroom =>
    dispatch({ type: actionTypes.SELECT_CHATROOM, chatroom }),
  setMainDisplay: payload =>
    dispatch({ type: actionTypes.SET_MAIN_DISPLAY, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(DMList);
