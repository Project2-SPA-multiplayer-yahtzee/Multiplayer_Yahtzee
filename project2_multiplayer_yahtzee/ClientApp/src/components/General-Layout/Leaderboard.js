import React, { Component } from 'react';
import axios from 'axios';

export class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: []
        };
    }

    componentDidMount() {
        this.loadPlayers();
    }

    async loadPlayers() {
        try {
            const response = await axios.get('https://localhost:7015/api/Game/getPlayers');
            this.setState({ players: response.data });
        } catch (error) {
            console.error('Error loading players:', error);
        }
    }

    render() {
        return (
            <div>
                <h1>Leaderboard</h1>

                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Games Played</th>
                            <th>Games Won</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.players.map(player => (
                            <tr key={player.id}>
                                <td>{player.userName}</td>
                                <td>{player.gamesPlayed}</td>
                                <td>{player.gamesWon}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
