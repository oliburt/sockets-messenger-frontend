import BackendAdapter from "../../adapters/BackendAdapter";
import ACTION_TYPES from "../reducers/actionTypes";

export const getUsersChatrooms = () => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_CHATROOMS });
  BackendAdapter.getUserChatrooms().then(chatrooms =>
    dispatch({ type: ACTION_TYPES.SET_USER_CHATROOMS, chatrooms })
  );
};

export const handleReceivedChatroom = response => dispatch => {
  if (response.deleted) {
    const chatroomId = response.chatroom.chatroom.id;
    dispatch({ type: ACTION_TYPES.REMOVE_USER_CHATROOM, id: chatroomId });
  } else {
    const { chatroom } = response;
    dispatch({ type: ACTION_TYPES.ADD_USER_CHATROOM, chatroom });
  }
};

export const handleReceivedMessage = response => dispatch => {
    const {message} = response
    dispatch({ type: ACTION_TYPES.ADD_MESSAGE, message });
};