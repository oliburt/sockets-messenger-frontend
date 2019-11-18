import React, { Component } from "react";
import BackendAdapter from "../adapters/BackendAdapter";
import { Container, Grid } from "semantic-ui-react";
import Cable from "../components/Cable";
import ChannelList from "../components/ChannelList";
import Conversation from "../components/Conversation";

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

  getChannelNames = chatrooms =>
    chatrooms.map(room => ({ id: room.id, name: room.name }));

  getSelectedChannel = (chatrooms, selectedChannel) =>
    chatrooms.find(room => room.id === selectedChannel);

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

        <Grid.Column className="noPadding" width={5}>
          <ChannelList
            channels={this.getChannelNames(chatrooms)}
            handleClick={this.setSelectedChannel}
            selectedChannel={selectedChannel}
          />
        </Grid.Column>
        <Grid.Column width={11}>
          <Conversation
            conversation={this.getSelectedChannel(chatrooms, selectedChannel)}
            currentUser={this.props.user}
          />
          message form to go here
        </Grid.Column>
      </Grid>
    );
  }
}

export default ChatContainer;
