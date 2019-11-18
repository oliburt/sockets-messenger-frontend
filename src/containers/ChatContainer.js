import React, { Component } from 'react';

export class ChatContainer extends Component {
    state = {
        chatrooms: [],
        selectedChannel: null
    }
    
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
