import React, { Component } from "react";
import actionTypes from "../redux/reducers/actionTypes";
import Cable from "./Cable";
import { connect } from 'react-redux'

class PresenceCable extends Component {
    
   handleReceivedActiveUser = response => {
    const { type } = response;
    switch (type) {
      case "DC_USER":
        let allUsers = [...this.props.allUsers];
        let user = allUsers.find(user => user.id === response.user_id);
        if (user) {
          user.active_user = false;
          this.props.setAllUsers(allUsers);
        }
        break;
      case "CO_USER":
        let allUsers2 = [...this.props.allUsers];
        let user2 = allUsers2.find(user => user.id === response.user_id);
        if (user2) {
          user2.active_user = true;
          this.props.setAllUsers(allUsers2);
        }
        break;
      default:
        return null;
    }
  };

  render() {
    return (
      <Cable
        channel={{ channel: "PresenceChannel" }}
        onReceived={this.handleReceivedActiveUser}
      />
    );
  }
}


const mapStateToProps = state => ({
  allUsers: state.userStore.allUsers
});

const mapDispatchToProps = dispatch => ({
  setAllUsers: users => dispatch({ type: actionTypes.SET_ALL_USERS, users })
});

export default connect(mapStateToProps, mapDispatchToProps)(PresenceCable);
