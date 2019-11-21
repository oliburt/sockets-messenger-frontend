import ACTION_TYPES from "./actionTypes";

const chatroomReducer = (
  state = {
    allChatrooms: [],
    userChatrooms: [],
    selectedChatroom: null,
    loading: false
  },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.LOADING_CHATROOMS:
      return {
        ...state,
        loading: true
      };

    case ACTION_TYPES.ADD_CHATROOM:
      return {
        ...state,
        allChatrooms: [...state.allChatrooms, action.chatroom],
        loading: false
      };

    case ACTION_TYPES.ADD_MESSAGE:
      return {
        ...state,
        userChatrooms: state.userChatrooms.map(room => {
          if (room.id === action.message.chatroom_id)
            return {
              ...room,
              messages: [...room.messages, action.message]
            };
          return room;
        }),
        loading: false
      };

    case ACTION_TYPES.REMOVE_CHATROOM:
      return {
        ...state,
        allChatrooms: state.allChatrooms.filter(
          chatroom => chatroom.id !== action.id
        ),
        loading: false
      };

    case ACTION_TYPES.UPDATE_CHATROOM:
      return {
        ...state,
        allChatrooms: state.allChatrooms.map(chatroom => {
          if (chatroom.id === action.chatroom.id) return action.chatroom;
          return chatroom;
        }),
        loading: false
      };

    case ACTION_TYPES.SELECT_CHATROOM:
      return {
        ...state,
        selectedChatroom: action.chatroom,
        loading: false
      };

    case ACTION_TYPES.REMOVE_SELECTED_CHATROOM:
      return {
        ...state,
        selectedChatroom: null,
        loading: false
      };

    case ACTION_TYPES.SET_CHATROOMS:
      return {
        ...state,
        allChatrooms: action.chatrooms,
        loading: false
      };

    case ACTION_TYPES.SET_USER_CHATROOMS:
      return {
        ...state,
        userChatrooms: action.chatrooms,
        loading: false
      };

    case ACTION_TYPES.ADD_USER_CHATROOM:
      return {
        ...state,
        userChatrooms: [...state.userChatrooms, action.chatroom],
        loading: false
      };

    case ACTION_TYPES.REMOVE_USER_CHATROOM:
      return {
        ...state,
        userChatrooms: state.userChatrooms.filter(
          chatroom => chatroom.id !== action.id
        ),
        loading: false
      };

    case ACTION_TYPES.UPDATE_USER_CHATROOM:
      return {
        ...state,
        userChatrooms: state.userChatrooms.map(chatroom => {
          if (chatroom.id === action.chatroom.id) return action.chatroom;
          return chatroom;
        }),
        loading: false
      };

    case ACTION_TYPES.REMOVE_USER_CHATROOMS:
      return {
        ...state,
        userChatrooms: [],
        loading: false
      };
    case ACTION_TYPES.ADD_MESSAGE_TO_SELECTED_CHATROOM:
      if (action.message.chatroom_id === state.selectedChatroom.id) {
        return {
          ...state,
          selectedChatroom: {
            ...state.selectedChatroom,
            messages: [...state.selectedChatroom.messages, action.message]
          },
          loading: false
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default chatroomReducer;
