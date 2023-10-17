import { useState, useEffect } from 'react';
import { chatHub, sendMessage } from './ChatHub';
import './chat.css';

function Chat() {
    const [messageList, setMessageList] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        chatHub.on('ReceiveMessage', (user, message) => {
            setMessageList(prev => [...prev, { user, message }]);
        });

        chatHub.start(); //chatHub.stop to close connection
    }, []);


    const sendChatMessage = async () => {

        await sendMessage('User1', newMessage);
        setNewMessage('');
    }

    
    return (
        <div className="app">
            <div className="chat-window">
                <div className="chat-body">
                    <div className="message-list">
                        {messageList.map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.user}: </strong> {msg.message}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-input">
                    <input
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Enter message..."
                    />
                    <button onClick={sendChatMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
