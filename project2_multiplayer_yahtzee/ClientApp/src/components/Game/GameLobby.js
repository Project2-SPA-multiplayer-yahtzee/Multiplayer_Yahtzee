import React, { useState } from 'react';
import axios from 'axios';
import authService from '../api-authorization/AuthorizeService';
import { useNavigate } from 'react-router-dom';

function GameLobby() {
    const [game, setGame] = useState({
        Name: 'Dick',
        PlayerGames: [], 
    });
    let navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [playerGame, setPlayerGame] = useState([]);



    const getGames = async () => {
        try {
            const response = await axios.get('https://localhost:7015/api/Game/getgames');
            console.log('API Response:', response.data);
            setGames(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const createGame = async () => {
        try {
            const response = await axios.post('https://localhost:7015/api/Game/creategame', game);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };


    const joinGame = async (gId) => {
        try {
            
            const user = await authService.getUser();
            const gId = 5;
            const testSub = user.sub;

            const response1 = await axios.get('https://localhost:7015/api/Game/getAllPlayerGame');
            const updatedPlayerGame = response1.data;
            setPlayerGame(updatedPlayerGame);

            const isUserInGame = updatedPlayerGame.some((pg) =>
                pg.gameId === gId && pg.playerId === testSub);

            if (isUserInGame) {
                navigate(`/gameroom/${gId}`);
            } else {
                const response = await axios.post(`https://localhost:7015/api/Game/join/${gId}`, `${testSub}`, {
                    headers: { 'Content-Type': 'text/plain' }
                });
                navigate(`/gameroom/${gId}`);
            }
            
        }
        catch (error) {
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
                <h3>Join a Game</h3>
                <ul>
                    {games.map((g) => (
                        <li key={g.id}>
                            {g.name} <button onClick={() => joinGame(g.id)}>Join</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GameLobby;