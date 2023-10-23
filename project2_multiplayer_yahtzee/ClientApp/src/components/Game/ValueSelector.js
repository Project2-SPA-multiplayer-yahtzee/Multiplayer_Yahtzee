import React, { useState, useEffect } from 'react';
import { useSignalR, Selector } from '../SignalR/UseSignalR';
import authService from '../api-authorization/AuthorizeService';


function ValueSelector({ playerChoice }) {
    const { value } = useSignalR();
    const [player, setPlayer] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);


    useEffect(() => {
        fetchPlayerDetails();
    }, []);

    const fetchPlayerDetails = async () => {
        try {
            const user = await authService.getUser();
            setPlayer(user);
            setUserName(user.name)
            setUserId(user.sub);
        } catch (error) {
            console.error('There was an error!', error);
        }

    };
    const handleClick = () => {
        Selector(userId, playerChoice, userName); // Pass the values you want to send to the server
    };

    return (
        <div>
            <button onClick={handleClick}>Select</button>
            {value && <h2>Winner: {value}</h2>}
        </div>
    );
}

export default ValueSelector;
