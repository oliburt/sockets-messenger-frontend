import React from 'react';

const Admin = ({currentUser}) => {
    
    return (currentUser ? 
        <div>
            {currentUser.username}
        </div> : null
    );
}

export default Admin;
