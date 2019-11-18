import React, { Component } from "react";
import "./App.css";
import { Container, Message } from "semantic-ui-react";
import { Route } from "react-router-dom";
import BackendAdapter from "./adapters/BackendAdapter";
import { routes } from "./config/routes";

const notFoundMessage = () => <Message negative>NOT FOUND</Message>;

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    BackendAdapter.validateUser().then(user => {
      if (user && user.id) {
        this.setUser(user);
      }
    });
  }

  login = user => {
    this.setState({ user }, () => this.props.history.push("/"));
  };

  setUser = user => this.setState({ user });

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
                    user={this.state.user}
                    login={this.login}
                    logout={this.logout}
                    signup={this.signup}
                    setUser={this.setUser}
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

export default App;
