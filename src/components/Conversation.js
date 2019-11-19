import React from 'react';
import ScrollToBottom from "react-scroll-to-bottom";


const Conversation = ({conversation, currentUser}) => {
    
    const renderMessages = messages => messages.map(message => {
        return (
            <div key={message.id} className={(currentUser && message.user.user_id === currentUser.id) ? "message user" : "message"}>
                <span className="name-span">{message.user.username}:</span>
                <p>{message.content}</p>
            </div>
        )
    })

    
    return conversation ? (
        <div>
            <h2>{conversation.name}</h2>
            <span>{conversation.description}</span>
            <ScrollToBottom className="messages-container">
                {renderMessages(conversation.messages)}
            </ScrollToBottom>
        </div>
    ) :
    (
        <div className="empty-channel"><span>No channel selected</span></div>
    )
}

export default Conversation;
