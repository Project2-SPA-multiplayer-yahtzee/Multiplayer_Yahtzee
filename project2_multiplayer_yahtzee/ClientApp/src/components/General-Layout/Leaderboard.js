import React, { Component } from 'react';


export class Leaderboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [
                { name: "Player 1", score: 245 },
                { name: "Player 2", score: 322 },
                { name: "Player 3", score: 273 }
            ]
        };
    }

    render() {
        return (
            <div>
                <h1>Yahtzee Leaderboard</h1>

                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.players.map(player =>
                            <tr key={player.name}>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}