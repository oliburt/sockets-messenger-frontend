import React, { Component } from "react";
var ActionCable = require("actioncable");

export class Cable extends Component {
  componentDidMount() {
    const { url, channel, onReceived, onConnected } = this.props;

    const cable = ActionCable.createConsumer(url);

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
