import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import BackendAdapter from "../adapters/BackendAdapter";

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
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          className="add-chat-input"
          type="text"
          placeholder="Channel Name"
          value={chatroomName}
          onChange={e => setChatroomName(e.target.value)}
        />
        <Form.TextArea
          placeholder="Description..."
          className="add-chat-input"
          value={chatroomDescription}
          onChange={e => setChatroomDescription(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default NewChatroomForm;
