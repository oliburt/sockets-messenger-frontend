import _ from "lodash";
import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import { connect } from 'react-redux'
import '../styles/FindChat.css'
import UserSearchResult from "./UserSearchResult";
import actionTypes from "../redux/reducers/actionTypes";


class FindUsers extends Component {
  state = {
    value: ''
  };

  handleChange = e => {
    this.setState({value: e.target.value})
  }

  
  renderResults = () => {
    const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
    const users = this.props.allUsers.filter(room => re.test(room.username))

    return this.props.currentUser ? users.filter(u => u.id !== this.props.currentUser.id).map(user => <UserSearchResult key={user.id} user={user} />) : []
  }

  render() {
      return (
        <div className='explore-container'>
          <Header as="h2">Search for User</Header>
          <div className="ui icon input">
            <input
              type="text"
              value={this.state.value}
              tabIndex="0"
              className="prompt"
              autoComplete="off"
              onChange={this.handleChange}
            />
            <i aria-hidden="true" className="search icon"></i>
          </div>
          <div className="results">
            {this.renderResults()}
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  allUsers: state.userStore.allUsers,
  currentUser: state.userStore.user,
});

const mapDispatchToProps = dispatch => ({
  setMainDispaly: payload => dispatch({type: actionTypes.SET_MAIN_DISPLAY, payload})
})



export default connect(mapStateToProps, mapDispatchToProps)(FindUsers);
