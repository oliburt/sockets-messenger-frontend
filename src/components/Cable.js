import React, { Component } from "react";
import BackendAdapter from "../adapters/BackendAdapter";
var ActionCable = require("actioncable");

export class Cable extends Component {
  state = {
    cable: null
  }
  
  componentDidMount() {
    const { channel, onReceived, onConnected } = this.props;

    const cable = ActionCable.createConsumer(BackendAdapter.BASE_WS_URL);

    cable.subscriptions.create(channel, {
      received: onReceived,
      connected: onConnected
    });
    this.setState({cable})
  }

  componentWillUnmount() {
    this.state.cable.subscriptions.subscriptions[0] && this.state.cable.subscriptions.remove(this.state.cable.subscriptions.subscriptions[0])
  }
  

  render() {
    return <></>;
  }
}

export default Cable;
