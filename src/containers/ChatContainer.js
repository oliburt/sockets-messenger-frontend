import React, { Component } from "react";
import Cable from "../components/Cable";
import SideBar from "./SideBar";
import MessagingContainer from "./MessagingContainer";
import NewChatroomForm from "../components/NewChatroomForm";
import "../styles/Chat.css";
import { connect } from "react-redux";
import {
  handleReceivedChatroom,
  handleReceivedMessage
} from "../redux/actions/userChatroomActions";
import { getAllChatrooms } from "../redux/actions/allChatroomsActions";
import { getUsersChatrooms } from "../redux/actions/userChatroomActions";
import FindChatrooms from "../components/FindChatrooms";
import PresenceCable from "../components/PresenceCable";
import FindUsers from "../components/FindUsers";
import { Icon } from "semantic-ui-react";

export class ChatContainer extends Component {
  componentDidMount() {
    this.props.getAllChatrooms();
    this.props.getUsersChatrooms();
  }

  getChatroomNames = chatrooms =>
    chatrooms.map(room => ({ id: room.id, name: room.name }));

  getSelectedChannel = (chatrooms, selectedChannel) =>
    chatrooms.find(room => room.id === selectedChannel);

  renderMainContent = mainDisplay => {
    if (mainDisplay === "None") return <div id="none-selected"><Icon name='chat' size='massive' color='grey'/></div>;
    if (mainDisplay === "Chatroom") return <MessagingContainer />;
    if (mainDisplay === "Explore") return <FindChatrooms />;
    if (mainDisplay === "NewDM") return <FindUsers />;
    if (mainDisplay === "NewChatroom") return <NewChatroomForm />;
  };

  render() {
    return (
      <div className="main-container">
        <PresenceCable />

        <Cable
          channel={{ channel: "ChatroomsChannel" }}
          onReceived={this.props.handleReceivedChatroom}
        />
        {this.props.userChatrooms.length
          ? this.props.userChatrooms.map(room => (
              <Cable
                key={room.id}
                channel={{ channel: "MessagesChannel", chatroom: room.id }}
                onReceived={this.props.handleReceivedMessage}
              />
            ))
          : null}

        <SideBar />
        <div id="main-content">
          {this.renderMainContent(this.props.mainDisplay)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userChatrooms: state.chatroomsStore.userChatrooms,
  mainDisplay: state.displayStore.mainDisplay
});

const mapDispatchToProps = dispatch => ({
  handleReceivedChatroom: response =>
    dispatch(handleReceivedChatroom(response)),
  handleReceivedMessage: response => dispatch(handleReceivedMessage(response)),
  getAllChatrooms: () => dispatch(getAllChatrooms()),
  getUsersChatrooms: () => dispatch(getUsersChatrooms())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
