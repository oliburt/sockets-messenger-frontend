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

export const signupUser = userDetails => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_USER });
  BackendAdapter.signup(userDetails).then(user => {
    if (user && user.id) {
      dispatch({ type: ACTION_TYPES.ADD_USER, user });
    }
  });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: ACTION_TYPES.LOADING_USER });
  BackendAdapter.logout().then(() =>
    dispatch({ type: ACTION_TYPES.REMOVE_USER })
  );
};
