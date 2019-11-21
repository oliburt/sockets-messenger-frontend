import React, { Component } from "react";
import BackendAdapter from "../adapters/BackendAdapter";
import { Form, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import actionTypes from "../redux/reducers/actionTypes";
import { connect } from "react-redux";
import "../styles/Auth.css";

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
        this.props.history.push('/')
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
        id='login-form'
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
        <p className="link"><Link to="/signup">Click here</Link> to sign up!</p>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch({type: actionTypes.ADD_USER, user})
})


export default connect(null, mapDispatchToProps)(LoginForm)