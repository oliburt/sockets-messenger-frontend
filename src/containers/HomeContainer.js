import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import { Button} from "semantic-ui-react";
import '../styles/UserPage.css'
import { Link } from 'react-router-dom'

export class HomeContainer extends Component {
  
  

  render() {
    return (
      <div>
        <div id="title-bar">
          {this.props.user ? <h1 className="main-title">Welcome, {this.props.user.username}</h1> :<h1 className="main-title">Welcome!</h1>}
          {this.props.user ? <Link to="/logout"><Button>Logout</Button></Link> : null}
        </div>
        <div>

        <ChatContainer user={this.props.user} />
        </div>


      </div>
    );
  }
}

export default HomeContainer;
