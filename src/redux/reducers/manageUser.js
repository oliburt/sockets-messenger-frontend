import ACTION_TYPES from "./actionTypes";

const userReducer = (
  state = {
    user: null,
    loading: false
  },
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.LOADING_USER:
      return {
        ...state,
        loading: true
      };

    case ACTION_TYPES.ADD_USER:
      return {
        ...state,
        user: action.user,
        loading: false
      };

    case ACTION_TYPES.REMOVE_USER:
      return {
        ...state,
        user: null,
        loading: false
      };

    default:
      return state;
  }
};

export default userReducer;
