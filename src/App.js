import React, { Component } from "react";
import "./App.css";
import { Container, Message } from "semantic-ui-react";
import { Route } from "react-router-dom";
import BackendAdapter from "./adapters/BackendAdapter";
import { routes } from "./config/routes";
import { connect } from 'react-redux'
import { validateUser } from './redux/actions/userActions'
import { getAllChatrooms } from './redux/actions/allChatroomsActions'
import { getUsersChatrooms } from './redux/actions/userChatroomActions'


const notFoundMessage = () => <Message negative>NOT FOUND</Message>;

class App extends Component {


  componentDidMount() {
    this.props.validateUser()
    this.props.getAllChatrooms()
    this.props.getUsersChatrooms()
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
  getAllChatrooms: () => dispatch(getAllChatrooms()),
  getUsersChatrooms: () => dispatch(getUsersChatrooms()),
})

export default connect(null, mapDispatchToProps)(App)
