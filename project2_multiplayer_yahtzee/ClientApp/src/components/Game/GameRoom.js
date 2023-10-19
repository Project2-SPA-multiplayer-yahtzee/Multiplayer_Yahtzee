import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Scorecard from './Scorecard'; // Import your Scorecard component
import DiceRoll from './DiceRoll'; // Import your DiceRoll component

const GameRoom = ({ gameId, playerId }) => {
    const [game, setGame] = useState(null);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        // Fetch game and player details when the component mounts
        fetchGameDetails();
        fetchPlayerDetails();
    }, [gameId, playerId]);

    const fetchGameDetails = () => {
        axios.get(`/api/games/${gameId}`)
            .then((response) => {
                setGame(response.data);
            })
            .catch((error) => {
                console.error('Error fetching game details: ', error);
            });
    };

    const fetchPlayerDetails = () => {
        axios.get(`/api/players/${playerId}`)
            .then((response) => {
                setPlayer(response.data);
            })
            .catch((error) => {
                console.error('Error fetching player details: ', error);
            });
    };

    const startGame = () => {
        axios.post(`/api/games/${gameId}/start`)
            .then(() => {
                // Handle success
            })
            .catch((error) => {
                console.error('Error starting the game: ', error);
            });
    };

    return (
        <div>
            {game && player && (
                <div>
                    <h2>Game Room: {game.name}</h2>
                    <p>Hosted by: {game.hostPlayer.username}</p>
                    <p>Players in the game:</p>
                    <ul>
                        {game.players.map((p) => (
                            <li key={p.id}>{p.username}</li>
                        ))}
                    </ul>

                    {game.hostPlayerId === player.id && (
                        <button onClick={startGame}>Start Game</button>
                    )}

                    <Scorecard player={player} game={game} />

                    {game.started && (
                        <DiceRoll playerId={player.id} gameId={game.id} />
                    )}
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