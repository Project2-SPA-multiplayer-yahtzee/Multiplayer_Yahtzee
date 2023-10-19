import React, { useState, useEffect } from 'react';
import axios from 'axios';



const GameLobby = () => {
    const [games, setGames] = useState([]);
    const [newGameName, setNewGameName] = useState('');
    const [joiningGameId, setJoiningGameId] = useState(null);

    useEffect(() => {
        // Fetch the list of available games when the component mounts
        fetchGames();
    }, []);

    const fetchGames = () => {
        axios.get('/api/games')
            .then((response) => {
                setGames(response.data);
            })
            .catch((error) => {
                console.error('Error fetching games: ', error);
            });
    };

    const createGame = () => {
        // Create a new game and add it to the list of games
        axios.post('/api/games', { name: newGameName })
            .then(() => {
                setNewGameName('');
                fetchGames(); // Refresh the list of games
            })
            .catch((error) => {
                console.error('Error creating a game: ', error);
            });
    };

    const joinGame = (gameId) => {
        // Join the selected game
        axios.post(`/api/games/${gameId}/join`)
            .then(() => {
                setJoiningGameId(null);
                fetchGames(); // Refresh the list of games
            })
            .catch((error) => {
                console.error('Error joining the game: ', error);
            });
    };

    return (
        <div>
            <h2>Game Lobby</h2>

            <div>
                <h3>Create a New Game</h3>
                <input
                    type="text"
                    placeholder="Game Name"
                    value={newGameName}
                    onChange={(e) => setNewGameName(e.target.value)}
                />
                <button onClick={createGame}>Create</button>
            </div>

            <div>
                <h3>Join a Game</h3>
                <ul>
                    {games.map((game) => (
                        <li key={game.id}>
                            {game.name} <button onClick={() => setJoiningGameId(game.id)}>Join</button>
                        </li>
                    ))}
                </ul>
            </div>

            {joiningGameId && (
                <div>
                    <p>Joining game...</p>
                    {joinGame(joiningGameId)}
                </div>
            )}
        </div>
    );
};

export default GameLobby;




//Display a list of available game rooms.
//Allow users to create new game rooms.
//Join existing game rooms.
//Display the list of players in each game room