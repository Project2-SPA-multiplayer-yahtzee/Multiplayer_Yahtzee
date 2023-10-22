import React, { Component } from 'react';

export class Rules extends Component {
    render() {
        return (
            <div className="container mt-4">
                <h1 className="text-center mb-4">Rock Paper Scissors Rules</h1>

                <h2>Objective</h2>
                <p>Rock Paper Scissors is a classic hand game where the objective is to defeat your opponent by choosing the winning hand gesture.</p>

                <h2>Gameplay</h2>
                <p>Two players simultaneously choose one of the three hand gestures: Rock, Paper, or Scissors. The choices are then compared to determine the winner.</p>

                <h2>Rules</h2>
                <p>Here are the rules for determining the winner:</p>

                <ul>
                    <li><strong>Rock beats Scissors:</strong> Rock smashes or breaks Scissors.</li>
                    <li><strong>Scissors beats Paper:</strong> Scissors cuts Paper.</li>
                    <li><strong>Paper beats Rock:</strong> Paper covers Rock.</li>
                </ul>

                <h2>Winning</h2>
                <p>The player whose hand gesture beats the opponent's hand gesture wins the round. The game can be played in a best-of-three format or any desired number of rounds.</p>
            </div>
        );
    }
}
