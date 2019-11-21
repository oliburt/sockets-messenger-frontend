import React, { useState } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import {postNewChatroom} from "../redux/actions/userChatroomActions";
import "../styles/NewChatroom.css";
import { connect } from 'react-redux'
import actionTypes from "../redux/reducers/actionTypes";


const NewChatroomForm = ({ setMainDisplay, user, postChatroom }) => {
  const [chatroomName, setChatroomName] = useState("");
  const [chatroomDescription, setChatroomDescription] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      name: chatroomName,
      description: chatroomDescription,
      public: true,
      creator_id: user.id
    };
    setChatroomDescription("");
    setChatroomName("");
    postChatroom(data);
    setMainDisplay("None");
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

const mapStateToProps = (state) => ({
  user: state.userStore.user
})

const mapDispatchToProps = dispatch => ({
  setMainDisplay: payload => dispatch({type: actionTypes.SET_MAIN_DISPLAY, payload}),
  postChatroom: chatroomData => dispatch(postNewChatroom(chatroomData))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewChatroomForm)