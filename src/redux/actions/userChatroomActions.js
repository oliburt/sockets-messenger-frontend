import BackendAdapter from "../../adapters/BackendAdapter";
import ACTION_TYPES from "../reducers/actionTypes";

export const getUsersChatrooms = () => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_CHATROOMS });
  BackendAdapter.getUserChatrooms().then(chatrooms => {
    if (Array.isArray(chatrooms)) {
      dispatch({ type: ACTION_TYPES.SET_USER_CHATROOMS, chatrooms });
    }
  });
};

export const addChatroomToUsersChatrooms = chatroom => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_CHATROOMS });
  BackendAdapter.postUserChatroom(chatroom).then(chatroom => {
    dispatch({type: ACTION_TYPES.ADD_USER_CHATROOM, chatroom})
  })
}

export const postNewChatroom = chatroomData => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_CHATROOMS });
  BackendAdapter.postChatroom(chatroomData)
}

export const handleReceivedChatroom = response => dispatch => {
  if (response.deleted) {
    const chatroomId = response.chatroom.chatroom.id;
    dispatch({ type: ACTION_TYPES.REMOVE_USER_CHATROOM, id: chatroomId });
  } else if (response.public) {
    const chatroom = response.chatroom.chatroom;
    dispatch({ type: ACTION_TYPES.ADD_CHATROOM, chatroom });
  } else if (response.dm) {
    const chatroom = response.chatroom.chatroom
    dispatch({ type: ACTION_TYPES.ADD_USER_CHATROOM, chatroom})
    dispatch({type: ACTION_TYPES.SELECT_CHATROOM, chatroom })
  } else {
    const { chatroom } = response;
    dispatch({ type: ACTION_TYPES.ADD_USER_CHATROOM, chatroom });
  }
};

export const handleReceivedMessage = response => dispatch => {
  const { message } = response;
  dispatch({ type: ACTION_TYPES.ADD_MESSAGE, message });
  dispatch({ type: ACTION_TYPES.ADD_MESSAGE_TO_SELECTED_CHATROOM, message });
};

export const handleAddNewPublicChatroomToUserChatrooms = chatroom => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_CHATROOMS });

}
