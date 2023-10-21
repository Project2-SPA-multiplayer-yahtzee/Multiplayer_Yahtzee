import { useState, useEffect } from 'react';
import { chatHub, sendMessage } from './ChatHub';

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
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="list-group">
                        {messageList.map((msg, index) => (
                            <div key={index} className="list-group-item">
                                <strong>{msg.user}: </strong> {msg.message}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mt-3">
                        <input
                            type="text"
                            className="form-control"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            placeholder="Enter message..."
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={sendChatMessage}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
