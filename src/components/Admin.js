import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import "../styles/Admin.css";
import DropBox from "./DropBox";
import { connect } from 'react-redux'
import { logoutUser } from "../redux/actions/userActions";


const Admin = ({ currentUser, logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="admin-container">
      <div onClick={() => setShowDropdown(!showDropdown)}>
        <Icon name="user circle" color="black" />
        <span>{currentUser ? currentUser.username : "Guest User"}</span>
        <Icon name="dropdown" />
      </div>
      {showDropdown ? (
        <div className="dropdown-content">
          <DropBox
            currentUser={currentUser}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            logout={logout}
          />
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.userStore.user
})


const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)