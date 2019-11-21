import React from "react";
import ChatroomList from "../components/ChatroomList";
import "../styles/Chat.css";
import "../styles/ChatroomList.css"
import Admin from "../components/Admin";
import { connect } from 'react-redux'
import actionTypes from "../redux/reducers/actionTypes";


const SideBar = ({
  channels,
  selectedChannel,
  user,
  setMainDisplay,
  logout,
  mainDisplay 
}) => {
  return (
    <div className="sidebar">
      <Admin currentUser={user} logout={logout} />
      <div
        className={
          mainDisplay === "Explore" ? "explore active" : 'explore'
        }
        onClick={() => setMainDisplay("Explore")}
      >
        <p>Explore</p>
      </div>
      {user ? <div
        className={
          mainDisplay === "NewChatroom" ? "add-chat active" : "add-chat"
        }
        onClick={() => setMainDisplay("NewChatroom")}
      >
        <p>+ New Chatroom</p>
      </div> : null}
      {user ? <div
        className={
          mainDisplay === "Find User" ? "add-dm active" : "add-dm"
        }
        onClick={() => setMainDisplay("NewDM")}
      >
        <p>+ New Direct Message</p>
      </div> : null}
      <ChatroomList
        channels={channels}
        selectedChannel={selectedChannel}
        setMainDisplay={setMainDisplay}
        mainDisplay={mainDisplay}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setMainDisplay: payload => dispatch({type: actionTypes.SET_MAIN_DISPLAY, payload})
})
const mapStateToProps = (state) => ({
  user: state.userStore.user
})


export default connect(mapStateToProps, mapDispatchToProps)(SideBar)