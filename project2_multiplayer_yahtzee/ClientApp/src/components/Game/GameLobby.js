import React, { useState } from 'react';
import axios from 'axios';

function GameLobby() {
    const [game, setGame] = useState({
        Name: 'Dick',
        PlayerGames: [], 
    });

const getGames = async () => {
    try {
        const response = await axios.post('https://localhost:7015/api/Game/getgames');
        console.log(response.data);
    } catch (error) {
        console.error('There was an error!', error);
    }
    };

    const getGame = async () => {
        try {
            const response = await axios.post('https://localhost:7015/api/Game/get/1');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const createGame = async () => {
        try {
            const response = await axios.get('https://localhost:7015/api/Game/creategame', game);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const joinGame = async () => {
        try {
            const response = await axios.post('https://localhost:7015/api/Game/join/1');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const fetchDetail = async () => {
        try {
            const response = await axios.get('https://localhost:7015/api/Game/game/1');
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <h2>Game Lobby</h2>
            <div>
                <h3>Create a New Game</h3>
                <button onClick={createGame}>Create</button>
            </div>
            <div>
                <h3>Get all games</h3>
                <button onClick={getGames}>Get games</button>
            </div>
            <div>
                <h3>Get a game</h3>
                <button onClick={getGame}>Get game</button>
            </div>
            <div>
                <h3>Join Game</h3>
                <button onClick={joinGame}>Join</button>
            </div>
            <div>
                <h3>Fetch Game detail</h3>
                <button onClick={fetchDetail}>Fetch</button>
            </div>
        </div>
    );
}

export default GameLobby;