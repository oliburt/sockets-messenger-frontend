import React from 'react';
import { Button, Header } from "semantic-ui-react";
import BackendAdapter from '../adapters/BackendAdapter';
import '../styles/Chat.css'
import '../styles/ChatroomList.css'

const ChatroomList = ({channels, handleClick, selectedChannel, setMainDisplay}) => {
    



    const handleDeleteButtonClick = (e, channel) => {
        e.stopPropagation()
        BackendAdapter.deleteChatroom(channel.id)
    }

    return (
        <div className="chatroom-list">
            <Header as='h4' className="chatrooms-title">Chatrooms</Header>
            <div className="add-chat" onClick={() => setMainDisplay("NewChatroom")}><p>+ New Chatroom</p></div>
        
            <ul className="channel-list">
                {channels ? channels.map(channel => <li key={channel.id} onClick={e => handleClick(channel.id)} className={selectedChannel === channel.id ? 'selected' : null}>{channel.name}<Button onClick={e => handleDeleteButtonClick(e, channel)} className="channel-del-btn">-</Button></li>) : null}
            </ul>
        </div>
    );
}

export default ChatroomList;
