import BackendAdapter from "../../adapters/BackendAdapter";
import ACTION_TYPES from "../reducers/actionTypes";

export const getAllChatrooms = () => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_CHATROOMS });
  BackendAdapter.get(BackendAdapter.CHATROOMS_URL).then(chatrooms =>
    dispatch({ type: ACTION_TYPES.SET_CHATROOMS, chatrooms })
  );
};

export const getSelectedChatroom = chatroom => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_CHATROOMS });
  BackendAdapter.get(`${BackendAdapter.CHATROOMS_URL}/${chatroom.id}`).then(
    chatroom => {
      if (chatroom && chatroom.id) {
        dispatch({type: ACTION_TYPES.SELECT_CHATROOM, chatroom})
      }
    }
  )
}

export const handleReceivedChatroom = response => dispatch => {
  if (response.deleted) {
    const chatroomId = response.chatroom.chatroom.id;
    dispatch({ type: ACTION_TYPES.REMOVE_CHATROOM, id: chatroomId });
  } else {
    const { chatroom } = response;
    dispatch({ type: ACTION_TYPES.ADD_CHATROOM, chatroom });
  }
};