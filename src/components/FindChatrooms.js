import _ from "lodash";
import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import SearchResult from "./SearchResult";
import { connect } from 'react-redux'
import '../styles/FindChat.css'


class FindChatrooms extends Component {
  state = {
    value: ''
  };

  handleChange = e => {
    this.setState({value: e.target.value})
  }

  
  renderResults = () => {
    const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
    const rooms = this.props.publicChatrooms.filter(room => re.test(room.name))
    return rooms.map(room => <SearchResult key={room.id} chatroom={room} />)
  }

  render() {
    return (
      <div className='explore-container'>
        <Header as="h2">Explore</Header>
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
  publicChatrooms: state.chatroomsStore.allChatrooms,
});



export default connect(mapStateToProps, null)(FindChatrooms);
