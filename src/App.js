import React, { Component } from "react";
import "./App.css";
import { Container, Message } from "semantic-ui-react";
import { Route } from "react-router-dom";
import BackendAdapter from "./adapters/BackendAdapter";
import { routes } from "./config/routes";
import { connect } from 'react-redux'
import { validateUser } from './redux/actions/userActions'
import { getChatrooms } from './redux/actions/userChatroomActions'
import actionTypes from './redux/reducers/actionTypes'


const notFoundMessage = () => <Message negative>NOT FOUND</Message>;

class App extends Component {


  componentDidMount() {
    this.props.validateUser()
    this.props.getChatrooms()
  }

  login = user => {
    this.setState({ user }, () => this.props.history.push("/"));
  };

  logout = () => {
    BackendAdapter.logout();
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App">
        <Container>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact
              component={routerProps =>
                route.component ? (
                  <route.component
                    {...routerProps}
                  />
                ) : (
                  notFoundMessage()
                )
              }
            />
          ))}
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  validateUser: () => dispatch(validateUser()),
  getChatrooms: () => dispatch(getChatrooms())
})

export default connect(null, mapDispatchToProps)(App)
