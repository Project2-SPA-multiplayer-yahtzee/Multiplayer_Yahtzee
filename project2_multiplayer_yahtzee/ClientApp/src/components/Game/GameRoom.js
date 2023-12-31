import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Chat from './Chat/Chat'
import authService from '../api-authorization/AuthorizeService';
import ValueSelector from '../Game/ValueSelector'



const GameRoom = () => {

    const [choice, setChoice] = useState([]);
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
            console.log(game);
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
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    const finishGame = async () => {
        try {
            const response = await axios.put(`https://localhost:7015/api/Game/finish/${gId}`);
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

    const setRock = () => {
        setChoice(1)
    };
    const setPaper = () => {
        setChoice(2)
    };
    const setScissor = () => {
        setChoice(3)
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
                    {game.started && (
                        <>
                            <button onClick={setRock}>Rock</button>
                            <button onClick={setPaper}>Paper</button>
                            <button onClick={setScissor}>Scissors</button>
                        </>
                    )}
                    <ValueSelector playerChoice={choice} />
                    <Chat />
                    <button onClick={startGame}>Start Game</button>
                    <button onClick={finishGame}>End Game</button>
                </div>
            )}
        </div>
    );
};

export default GameRoom;
