
import React from 'react'
import { Form } from 'semantic-ui-react'
import BackendAdapter from '../adapters/BackendAdapter'


class SignupForm extends React.Component {
  state = {
    username: '',
    password: '',
    password_confirmation: ''
  }

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  submit = e => {
    e.preventDefault()
    BackendAdapter.signup(this.state).then(
      user => this.props.login(user))
  }


  render() {
    return (
      <Form
        onSubmit={this.submit}
        onChange={e => this.handleInputChange(e.target.name, e.target.value)}
      >
        <Form.Input
          name="username"
          type="username"
          placeholder="username"
          autocomplete="username"
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
        <a href= "/login">Click here</a> to log in!
      </Form>
    )
  }
}

export default SignupForm