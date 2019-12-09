import React from "react";
import { Form, Message } from "semantic-ui-react";
import BackendAdapter from "../adapters/BackendAdapter";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { signupUser } from "../redux/actions/userActions";



class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
    password_confirmation: "",
    errors: []
  };

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  setErrors = errors => this.setState({ errors: [...errors] });

  submit = e => {
    e.preventDefault();
    const user = {
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
    }

    BackendAdapter.signup(user).then(user => {
      if (user && user.error) {
        this.setErrors([user.error]);
      } else if (user && user.errors) {
        this.setErrors(user.errors);
      } else if (user && user.id) {
        this.props.signup(user);
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
        id='signup-form'
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
        <Form.Input
          name="password_confirmation"
          type="password"
          placeholder="Confirm Password"
          value={this.state.password_confirmation}
        />
        <Form.Button>Submit</Form.Button>
        <p className="link"><Link to="/login">Click here</Link> to log in!</p>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signupUser(user))
})


export default connect(null, mapDispatchToProps)(SignupForm)