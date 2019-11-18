import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const Admin = ({ currentUser, logout }) => {
  return currentUser ? (
    <div className="admin-container">
      <Icon name="user circle" color="black" />
      <span>{currentUser.username}</span>
      <Button onClick={() => logout()}>
        Logout
      </Button>
    </div>
  ) : (
    <div className="admin-container">
      <Icon name="user circle" color="black" />
      <span>Guest User</span>
      <Button as={Link} to="/login">
        Login
      </Button>
      <Button as={Link} to="/signup">
        Sign Up
      </Button>
    </div>
  );
};

export default Admin;
