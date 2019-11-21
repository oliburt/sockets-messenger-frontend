import React from "react";
import { connect } from "react-redux";
import actionTypes from "../redux/reducers/actionTypes";
import { getSelectedChatroom } from "../redux/actions/allChatroomsActions";

function SearchResult({
  chatroom,
  userChatrooms,
  setSelectedChatroom,
  getAndSelectChatroom,
  setMainDisplay
}) {
  const handleClick = e => {
    const isUserChatroom = userChatrooms.find(room => room.id === chatroom.id);
    if (isUserChatroom) {
      setSelectedChatroom(isUserChatroom);
    } else {
      getAndSelectChatroom(chatroom);
    }
    setMainDisplay("Chatroom")
  };

  return <><button onClick={handleClick}>Open Chatroom</button><p>{chatroom.name}</p></>;
}

const mapStateToProps = state => ({
  userChatrooms: state.chatroomsStore.userChatrooms
});

const mapDispatchToProps = dispatch => ({
  setSelectedChatroom: chatroom =>
    dispatch({ type: actionTypes.SELECT_CHATROOM, chatroom }),
  getAndSelectChatroom: chatroom => dispatch(getSelectedChatroom(chatroom)),
  setMainDisplay: payload => dispatch({type: actionTypes.SET_MAIN_DISPLAY, payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
