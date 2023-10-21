import React, { Component } from 'react';
import Chat from './Chat';
import Roll from './DiceRoll';


export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
        <div class="text-center">
            <br></br>
            <h1>Welcome to the ultimate online Yahtzee experience!</h1>
            <br></br>
            <img src="https://i.ibb.co/NrDZDRN/dices1.png" alt="dices"></img>
            <p> In our interactive YAHTZEE game, players can register and immerse themselves in the classic dice-rolling fun with friends and opponents from around the world.
                Challenge your pals or make new ones by inviting them to lobby and starting a game.
                If you are new to the game, you'll find everything you need to know under the "Rules" tab.
                Are you ready to shake, rattle, and roll your way to glory? Join the game and start playing today!
            </p>
        <Chat />
        <Roll />
      </div>
    );
  }
}
