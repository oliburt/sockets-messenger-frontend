
import React from 'react'
import { Form } from 'semantic-ui-react'

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
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
          autocomplete="password"
          value={this.state.password}
        />
        <Form.Button>Submit</Form.Button>
        <a href= "/login">Click here</a> to log in!
      </Form>
    )
  }
}

export default SignupForm