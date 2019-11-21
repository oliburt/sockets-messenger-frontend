import React, { Component } from "react";
import BackendAdapter from "../adapters/BackendAdapter";
var ActionCable = require("actioncable");

export class Cable extends Component {
  componentDidMount() {
    const { channel, onReceived, onConnected } = this.props;

    const cable = ActionCable.createConsumer(BackendAdapter.BASE_WS_URL);

    cable.subscriptions.create(channel, {
      received: onReceived,
      connected: onConnected
    });
  }

  render() {
    return <></>;
  }
}

export default Cable;
