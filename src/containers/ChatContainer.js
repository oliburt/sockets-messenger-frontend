import React, { Component } from "react";
import BackendAdapter from "../adapters/BackendAdapter";
import { Container, Grid } from "semantic-ui-react";
import Cable from "../components/Cable";

export class ChatContainer extends Component {
  state = {
    chatrooms: [],
    selectedChannel: null
  };

  componentDidMount = () =>
    BackendAdapter.get(BackendAdapter.CHATROOMS_URL).then(this.setChatrooms);

  setChatrooms = chatrooms => this.setState({ chatrooms });
  setSelectedChannel = selectedChannel => this.setState({ selectedChannel });

  handleReceivedChatroom = response => {
    if (response.deleted) {
      const chatroomId = response.chatroom.chatroom.id;
      // console.log(response)
      this.setChatrooms(
        this.state.chatrooms.filter(room => room.id !== chatroomId)
      );
    } else {
      const { chatroom } = response;
      this.setChatrooms([...this.state.chatrooms, chatroom]);
    }
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const chatroomsCopy = [...this.state.chatrooms];
    const chatroom = chatroomsCopy.find(
      room => room.id === message.chatroom_id
    );
    chatroom.messages = [...chatroom.messages, message];
    this.setChatrooms(chatroomsCopy);
  };

  render() {
    const { chatrooms, selectedChannel } = this.state;

    return (
      <Grid>
        <Cable
          channel={{ channel: "ChatroomsChannel" }}
          url={BackendAdapter.BASE_WS_URL}
          onReceived={this.handleReceivedChatroom}
        />
        {this.state.chatrooms.length
          ? this.state.chatrooms.map(room => (
              <Cable
                key={room.id}
                channel={{ channel: "MessagesChannel", chatroom: room.id }}
                url={BackendAdapter.BASE_WS_URL}
                onReceived={this.handleReceivedMessage}
              />
            ))
          : null}
      </Grid>
    );
  }
}

export default ChatContainer;
