import React, { Component } from 'react';



export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div class="text-center">
                <br></br>
                <h1>Welcome to the ultimate online Rock, Paper, Scissors experience!</h1>
                <br></br>
                <img src="https://i.ibb.co/6DLDJTm/rock-paper-scissors-1.png" alt="hands"></img>
                <p> In our interactive Rock, Paper, Scissors game, players can register and immerse themselves in the classic hand gesturing fun with friends and opponents from around the world.
                    Challenge your pals or make new ones by inviting them to lobby and starting a game.
                    If you are new to the game, you'll find everything you need to know under the "Rules" tab.
                    Are you ready to shake, rattle, and cut your way to glory? Join the game and start playing today!
                </p>
            </div>
        );
    }
}