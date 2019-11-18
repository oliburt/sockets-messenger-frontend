import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/Admin.css";

const DropBox = ({ currentUser, showDropdown, logout }) => {
    const history = useHistory()

    const loginClick = e => {
        e.stopPropagation()
        history.push('/login')
    }

    const signupClick = e => {
        e.stopPropagation()
        history.push('/signup')
    }

    const logoutClick = e => {
        e.stopPropagation()
        logout()
        // setShowDropdown(false)
    }

  return (
    <>
      {!currentUser ? (
        <>
          <div onClick={loginClick}>Login</div>
          <div onClick={signupClick}>Sign Up</div>
        </>
      ) : (
        <div onClick={logoutClick}>Logout</div>
      )}
    </>
  );
};

export default DropBox;
