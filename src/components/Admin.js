import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";

const Admin = ({ currentUser }) => {
  return currentUser ? (
    <div className="admin-container">
      <Icon name="user circle" color="black"/>
      <span>{currentUser.username}</span>
      <Button as={Link} to='/logout'>Logout</Button>
    </div>
  ) : null;
};

export default Admin;
