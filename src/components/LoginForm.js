import React, { Component } from "react";
import BackendAdapter from "../adapters/BackendAdapter";
import { Form, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

export class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    errors: []
  };

  setErrors = errors => this.setState({ errors: [...errors] });

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  submit = e => {
    e.preventDefault();
    BackendAdapter.login({
      username: this.state.username,
      password: this.state.password
    }).then(user => {
      if (user && user.error) {
        this.setErrors([user.error]);
      } else if (user && user.errors) {
        this.setErrors(user.errors);
      } else if (user && user.id) {
        this.props.login(user);
      } else {
        this.setErrors(["Something Went Wrong!"]);
        console.log("Return Value from server: ", user);
      }
    });
  };

  render() {
    return (
      <Form
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
      >
        {this.state.errors.length > 0 ? (
          <Message negative>
            {this.state.errors.map(error => (
              <p key={error}>{error}</p>
            ))}
          </Message>
        ) : null}
        <Form.Input
          name="username"
          type="username"
          placeholder="username"
          autoComplete="username"
          value={this.state.username}
        />
        <Form.Input
          name="password"
          type="password"
          placeholder="password"
          value={this.state.password}
        />
        <Form.Button>Submit</Form.Button>
        <Link to="/signup">Click here</Link> to sign up!
      </Form>
    );
  }
}

export default LoginForm;
