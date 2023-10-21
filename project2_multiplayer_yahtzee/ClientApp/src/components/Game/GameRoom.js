import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Scorecard from './Scorecard';
import DiceRoll from './DiceRoll'; 
import Chat from '../Chat/Chat'
import authService from '../api-authorization/AuthorizeService';

const GameRoom = () => {
    
    const { gameIdForGameRoom } = useParams();
    const [game, setGame] = useState(null);
    const [player, setPlayer] = useState(null);
    const [gamePlayers, setGamePlayers] = useState(null);

    useEffect(() => {

        getGame();
        fetchPlayerDetails();
        fetchPlayersInGame();
       
    }, [gameIdForGameRoom]);

    const getGame = async () => {
        try {
            const response = await axios.get(`https://localhost:7015/api/Game/get/${gameIdForGameRoom}`);
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
            const response = await axios.post(`https://localhost:7015/api/Game/start/${gameIdForGameRoom}`);
            console.log(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const fetchPlayersInGame = async () => {
        try {
            const response = await axios.get(`https://localhost:7015/api/Game/getPlayersInGame/${gameIdForGameRoom}`);
            setGamePlayers(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    
    /*<Scorecard player={player} game={game} />*/

    return (
        <div>
            {game && player && (
                <div>
                    <h2>Game Room: {game.name}</h2>
                    <p>Players in the game:</p>
                    <ul>
                        {gamePlayers.map((gamePlayer, index) => (
                            <li key={index}>{gamePlayer.Player.UserName}</li>
                        ))}
                    </ul>

                    
                    <button onClick={startGame}>Start Game</button>
                    
                    {game.started && (
                        <DiceRoll />
                    )}
                    <Chat />
                </div>
            )}
        </div>
    );
};

export default GameRoom;



//Display the game board with scorecards for each player.
//Show a dice roller component for rolling the dice.
//Implement game logic for scoring and tracking turns.
//Communicate with the server to keep all players in sync.
//Handle game events and state changes, such as rolling, selecting dice, and scoring.