import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../api-authorization/AuthorizeService';

function PersonalScores() {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        fetchPlayerDetails();
    }, []);

    const fetchPlayerDetails = async () => {
        try {
            const user = await authService.getUser();
            const playerId = user.sub;
            console.log(playerId);
            const response = await axios.get(`https://localhost:7015/api/Game/getPlayer/${playerId}`);
            setPlayer(response.data);
            
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    

    if (player === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{player.userName}'s personal stats!</h1>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Games Played</th>
                        <th>Games Won</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{player.gamesPlayed}</td>
                        <td>{player.gamesWon}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PersonalScores;