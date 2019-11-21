import React from "react";
import { connect } from "react-redux";
import actionTypes from "../redux/reducers/actionTypes";
import { getSelectedChatroom } from "../redux/actions/allChatroomsActions";
import { Icon } from "semantic-ui-react";
import { isUserActive } from "../helpers/helperFunctions";
import BackendAdapter from "../adapters/BackendAdapter";

function UserSearchResult({
  user,
  userChatrooms,
  setSelectedChatroom,
  getAndSelectChatroom,
  setMainDisplay,
  allUsers,
  currentUser
}) {
  const handleClick = e => {
    const data = {
      receiver_id: user.id,
      chatroom: {
        name: "PRIVATE",
        public: false,
        creator_id: currentUser.id
      }
    };
    const isExistingChat = userChatrooms.find(room =>
      !room.public && room.users.includes(user.id)
    );

    if (isExistingChat) {
      setSelectedChatroom(isExistingChat);
    } else {
      BackendAdapter.postDM(data);
    }
    setMainDisplay("Chatroom");
  };

  return (
    <>
      <button onClick={handleClick}>Message</button>

      <p>
        <Icon
          name="user"
          color={isUserActive(allUsers, { user_id: user.id }) ? "green" : "red"}
        />
        {user.username}
      </p>
    </>
  );
}

const mapStateToProps = state => ({
  userChatrooms: state.chatroomsStore.userChatrooms,
  allUsers: state.userStore.allUsers,
  currentUser: state.userStore.user
});

const mapDispatchToProps = dispatch => ({
  setSelectedChatroom: chatroom =>
    dispatch({ type: actionTypes.SELECT_CHATROOM, chatroom }),
  getAndSelectChatroom: chatroom => dispatch(getSelectedChatroom(chatroom)),
  setMainDisplay: payload =>
    dispatch({ type: actionTypes.SET_MAIN_DISPLAY, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchResult);
