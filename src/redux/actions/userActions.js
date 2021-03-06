import BackendAdapter from "../../adapters/BackendAdapter";
import ACTION_TYPES from "../reducers/actionTypes";

export const validateUser = () => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_USER });
  BackendAdapter.validateUser().then(user => {
    if (user && user.id) {
      dispatch({ type: ACTION_TYPES.ADD_USER, user });
    }
  });
};

export const loginUser = userDetails => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_USER });
  BackendAdapter.login(userDetails).then(user => {
    if (user && user.id) {
      dispatch({ type: ACTION_TYPES.ADD_USER, user });
    }
  });
};

export const signupUser = user => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_USER });
    if (user && user.id) {
      dispatch({ type: ACTION_TYPES.ADD_USER, user });
      dispatch({ type: ACTION_TYPES.ADD_USER_TO_ALL_USERS, user });
    }
};

export const logoutUser = () => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_USER });
  BackendAdapter.logout().then(() => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTED_CHATROOM });
    dispatch({ type: ACTION_TYPES.REMOVE_USER_CHATROOMS });
    dispatch({ type: ACTION_TYPES.REMOVE_USER });
  });
};

export const fetchAllUsers = () => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_USER });
  BackendAdapter.fetchAllUsers().then(users => {
    dispatch({ type: ACTION_TYPES.SET_ALL_USERS, users });
  });
};
