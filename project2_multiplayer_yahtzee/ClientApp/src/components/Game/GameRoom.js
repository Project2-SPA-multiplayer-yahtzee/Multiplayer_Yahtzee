import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chat from './Chat/Chat'
import authService from '../api-authorization/AuthorizeService';

const GameRoom = () => {

    const { gId } = useParams();
    const [game, setGame] = useState(null);
    const [player, setPlayer] = useState(null);
    const [gamePlayers, setGamePlayers] = useState([]);

    useEffect(() => {
        getGame();
        fetchPlayerDetails();
        fetchPlayersInGame();
    }, [gId]);

    const getGame = async () => {
        try {
            const response = await axios.get(`https://localhost:7015/api/Game/get/${gId}`);
            setGame(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const fetchPlayerDetails = async () => {
        try {
            const user = await authService.getUser();
            setPlayer(user);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const startGame = async () => {
        try {
            const response = await axios.put(`https://localhost:7015/api/Game/start/${gId}`);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const fetchPlayersInGame = async () => {
        try {
            const response = await axios.get(`https://localhost:7015/api/Game/getPlayersInGame/${gId}`);
            setGamePlayers(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };


    return (
        <div>
            {game && player && (
                <div>
                    <h2>Game Room: {game.name}</h2>
                    <p>Players in the game:</p>
                    <ul>
                        {gamePlayers.map((gamePlayer, index) => (
                            <li key={index}>{gamePlayer.userName}</li>
                        ))}
                    </ul>
                    <button onClick={startGame}>Start Game</button>
                    <Chat />
                </div>
            )}
        </div>
    );
};

export default GameRoom;
