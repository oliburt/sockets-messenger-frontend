import React, { Component } from "react";
import BackendAdapter from "../adapters/BackendAdapter";
import Cable from "../components/Cable";
import SideBar from "./SideBar";
import MessagingContainer from "./MessagingContainer";
import NewChatroomForm from "../components/NewChatroomForm";
import "../styles/Chat.css";
import { connect } from 'react-redux'
import { handleReceivedChatroom, handleReceivedMessage } from "../redux/actions/userChatroomActions";


export class ChatContainer extends Component {
  state = {
    mainDisplay: "None"
  };

  setMainDisplay = value => this.setState({ mainDisplay: value });



  handleChannelClick = channel => {
    this.setState({
      selectedChannel: channel,
      mainDisplay: "Chatroom"
    });
  };

  // handleReceivedChatroom = response => {
  //   if (response.deleted) {
  //     const chatroomId = response.chatroom.chatroom.id;
  //     // console.log(response)
  //     this.setChatrooms(
  //       this.state.chatrooms.filter(room => room.id !== chatroomId)
  //     );
  //   } else {
  //     const { chatroom } = response;
  //     this.setChatrooms([...this.state.chatrooms, chatroom]);
  //   }
  // };

  getChatroomNames = chatrooms =>
    chatrooms.map(room => ({ id: room.id, name: room.name }));

  getSelectedChannel = (chatrooms, selectedChannel) =>
    chatrooms.find(room => room.id === selectedChannel);

  // handleReceivedMessage = response => {
  //   const { message } = response;
  //   const chatroomsCopy = [...this.state.chatrooms];
  //   const chatroom = chatroomsCopy.find(
  //     room => room.id === message.chatroom_id
  //   );
  //   chatroom.messages = [...chatroom.messages, message];
  //   this.setChatrooms(chatroomsCopy);
  // };

  renderMainContent = mainDisplay => {
    const { chatrooms, selectedChannel } = this.state;

    if (mainDisplay === "None") return <div>Select a chatroom</div>;
    if (mainDisplay === "Chatroom")
      return (
        <MessagingContainer
          conversation={this.getSelectedChannel(chatrooms, selectedChannel)}
          selectedChannel={this.getSelectedChannel(chatrooms, selectedChannel)}
          user={this.props.user}
        />
      );
    if (mainDisplay === "NewChatroom")
      return <NewChatroomForm setMainDisplay={this.setMainDisplay} />;
  };

  render() {
    const { mainDisplay } = this.state;

    return (
      <div className="main-container">
        <Cable
          channel={{ channel: "ChatroomsChannel" }}
          url={BackendAdapter.BASE_WS_URL}
          onReceived={this.props.handleReceivedChatroom}
        />
        {this.props.userChatrooms.length
          ? this.props.userChatrooms.map(room => (
              <Cable
                key={room.id}
                channel={{ channel: "MessagesChannel", chatroom: room.id }}
                url={BackendAdapter.BASE_WS_URL}
                onReceived={this.props.handleReceivedMessage}
              />
            ))
          : null}

        <SideBar
          handleChannelClick={this.handleChannelClick}
          setMainDisplay={this.setMainDisplay}
          mainDisplay={mainDisplay}
        />
        <div id="main-content">
          {this.renderMainContent(this.state.mainDisplay)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userChatrooms: state.chatroomsStore.userChatrooms
})

const mapDispatchToProps = dispatch => ({
  handleReceivedChatroom: () => dispatch(handleReceivedChatroom()),
  handleReceivedMessage: () => dispatch(handleReceivedMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)