import React, { Component } from 'react';
import BackendAdapter from '../adapters/BackendAdapter';

export class ChatContainer extends Component {
    state = {
        chatrooms: [],
        selectedChannel: null
    }

    componentDidMount = () => (
        BackendAdapter.get(BackendAdapter.CHATROOMS_URL).then(this.setChatrooms)
    )
    
    setChatrooms = chatrooms => this.setState({chatrooms})
    setSelectedChannel = selectedChannel => this.setState({selectedChannel})

    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ChatContainer;
