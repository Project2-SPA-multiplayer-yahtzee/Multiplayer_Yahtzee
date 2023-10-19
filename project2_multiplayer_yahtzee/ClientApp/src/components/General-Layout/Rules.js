import React, { Component } from 'react';

export class Rules extends Component {
    render() {
        return (
            <div className="container mt-4">
                <h1 className="text-center mb-4">Yahtzee Rules</h1>

                <h2>Objective</h2>
                <p>Yahtzee is a classic dice game where the objective is to score points by rolling five dice to make specific combinations.</p>

                <h2>Gameplay</h2>
                <p>Each player takes turns rolling the five dice and can reroll some or all of them up to three times. The game consists of 13 rounds.</p>

                <h2>Scoring</h2>
                <p>Yahtzee involves scoring in various categories. Each category can be scored only once. Here are the categories and how they are scored:</p>

                <div className="row">
                    <div className="col-md-6">
                        <h3>Upper Section:</h3>
                        <ul>
                            <li><strong>Ones:</strong> Sum of all ones rolled</li>
                            <li><strong>Twos:</strong> Sum of all twos rolled</li>
                            <li><strong>Threes:</strong> Sum of all threes rolled</li>
                            <li><strong>Fours:</strong> Sum of all fours rolled</li>
                            <li><strong>Fives:</strong> Sum of all fives rolled</li>
                            <li><strong>Sixes:</strong> Sum of all sixes rolled</li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h3>Lower Section:</h3>
                        <ul>
                            <li><strong>Three of a Kind:</strong> Sum of all dice if you have at least three of the same</li>
                            <li><strong>Four of a Kind:</strong> Sum of all dice if you have at least four of the same</li>
                            <li><strong>Full House:</strong> 25 points for a full house (three of a kind and a pair)</li>
                            <li><strong>Small Straight:</strong> 30 points for a small straight (four consecutive dice)</li>
                            <li><strong>Large Straight:</strong> 40 points for a large straight (five consecutive dice)</li>
                            <li><strong>Yahtzee:</strong> 50 points for a Yahtzee (five of a kind)</li>
                            <li><strong>Chance:</strong> Sum of all dice</li>
                        </ul>
                    </div>
                </div>

                <h2>Winning</h2>
                <p>The player with the highest total score at the end of the 13 rounds wins the game. Strategy and decision-making are essential to maximize your score in each category.</p>
            </div>
        );
    }
}
