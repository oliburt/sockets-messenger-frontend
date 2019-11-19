import React, { useState } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import BackendAdapter from "../adapters/BackendAdapter";
import "../styles/NewChatroom.css";

const NewChatroomForm = ({ setMainDisplay }) => {
  const [chatroomName, setChatroomName] = useState("");
  const [chatroomDescription, setChatroomDescription] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      name: chatroomName,
      description: chatroomDescription
    };
    setChatroomDescription("");
    setChatroomName("");
    setMainDisplay("None");
    BackendAdapter.postChatroom(data);
  };

  return (
    <div className="new-chat-container">
      <Form onSubmit={handleSubmit}>
        <Header as='h1'>New Chatroom</Header>
        <Form.Input
          className="add-chat-input"
          type="text"
          label="Name"
          placeholder="Channel Name"
          value={chatroomName}
          onChange={e => setChatroomName(e.target.value)}
        />
        <Form.TextArea
          placeholder="Description..."
          className="add-chat-input"
          label="Description"
          value={chatroomDescription}
          onChange={e => setChatroomDescription(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default NewChatroomForm;
