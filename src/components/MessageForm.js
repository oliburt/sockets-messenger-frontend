import React, { useState } from "react";
import BackendAdapter from "../adapters/BackendAdapter";
import { Form } from "semantic-ui-react";

const MessageForm = ({ user, selectedChatroomId }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.length < 1) return;
    const data = {
      user_id: user.id,
      chatroom_id: selectedChatroomId,
      content: message
    };
    setMessage("");
    BackendAdapter.postMessage(data);
  };

  return (
    <div className="messageForm">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input
            placeholder="Press enter to send message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="message-input"
          />
        </Form.Field>
      </Form>
    </div>
  );
};

export default MessageForm;
