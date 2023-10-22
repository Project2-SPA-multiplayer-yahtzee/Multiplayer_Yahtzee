import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';


function Scorecard({ diceValues }) {
    const [scorecard, setScorecard] = useState({
        ones: null,
        twos: null,
        threes: null,
        fours: null,
        fives: null,
        sixes: null,
        threeOfAKind: null,
        fourOfAKind: null,
        fullHouse: null,
        smallStraight: null,
        largeStraight: null,
        yahtzee: null,
        chance: null,
        totalScore: 0,
    });


    // Initialize the SignalR connection.
    const hubConnection = new HubConnectionBuilder()
        .withUrl('/signalRHub')  // Replace '/hubUrl' with your SignalR hub URL.
        .build();

    useEffect(() => {
        hubConnection.start().catch(error => {
            console.error('Error starting SignalR connection:', error);
        });
    }, []);




    // Calculate the score for the "Ones" category.
    const calculateOnes = (diceValues) => {
        return diceValues.filter((value) => value === 1).reduce((acc, value) => acc + value, 0);
    };

    // Calculate the score for the "Twos" category.
    const calculateTwos = (diceValues) => {
        return diceValues.filter((value) => value === 2).reduce((acc, value) => acc + value, 0);
    };

    // Calculate the score for the "Threes" category.
    const calculateThrees = (diceValues) => {
        return diceValues.filter((value) => value === 3).reduce((acc, value) => acc + value, 0);
    };

    // Calculate the score for the "Fours" category.
    const calculateFours = (diceValues) => {
        return diceValues.filter((value) => value === 4).reduce((acc, value) => acc + value, 0);
    };

    // Calculate the score for the "Fives" category.
    const calculateFives = (diceValues) => {
        return diceValues.filter((value) => value === 5).reduce((acc, value) => acc + value, 0);
    };

    // Calculate the score for the "Sixes" category.
    const calculateSixes = (diceValues) => {
        return diceValues.filter((value) => value === 6).reduce((acc, value) => acc + value, 0);
    };

    // Calculate the score for the "Three of a Kind" category.
    const calculateThreeOfAKind = (diceValues) => {
        const counts = {};
        for (const value of diceValues) {
            counts[value] = (counts[value] || 0) + 1;
        }

        for (const value in counts) {
            if (counts[value] >= 3) {
                return diceValues.reduce((acc, value) => acc + value, 0);
            }
        }

        return 0; // No three of a kind found.
    };

    // Calculate the score for the "Four of a Kind" category.
    const calculateFourOfAKind = (diceValues) => {
        const counts = {};
        for (const value of diceValues) {
            counts[value] = (counts[value] || 0) + 1;
        }

        for (const value in counts) {
            if (counts[value] >= 4) {
                return diceValues.reduce((acc, value) => acc + value, 0);
            }
        }

        return 0; // No four of a kind found.
    };

    // Calculate the score for the "Full House" category.
    const calculateFullHouse = (diceValues) => {
        const counts = {};
        for (const value of diceValues) {
            counts[value] = (counts[value] || 0) + 1;
        }

        const hasThreeOfAKind = Object.values(counts).includes(3);
        const hasPair = Object.values(counts).includes(2);

        if (hasThreeOfAKind && hasPair) {
            return 25; // Score for a full house.
        }

        return 0; // Score of 0 if it's not a full house.
    };

    // Calculate the score for the "Small Straight" category.
    const calculateSmallStraight = (diceValues) => {
        const uniqueValues = [...new Set(diceValues)].sort();

        if (
            (uniqueValues.length === 4 && uniqueValues[3] - uniqueValues[0] === 3) ||
            (uniqueValues.length === 5 && uniqueValues[4] - uniqueValues[0] === 4)
        ) {
            return 30; // Score for a small straight.
        }

        return 0; // Score of 0 if it's not a small straight.
    };

    // Calculate the score for the "Large Straight" category.
    const calculateLargeStraight = (diceValues) => {
        const uniqueValues = [...new Set(diceValues)].sort();

        if (uniqueValues.length === 5 && uniqueValues[4] - uniqueValues[0] === 4) {
            return 40; // Score for a large straight.
        }

        return 0; // Score of 0 if it's not a large straight.
    };

    // Calculate the score for the "Yahtzee" category.
    const calculateYahtzee = (diceValues) => {
        const isYahtzee = diceValues.every((value) => value === diceValues[0]);

        return isYahtzee ? 50 : 0;
    };

    // Calculate the score for the "Chance" category.
    const calculateChance = (diceValues) => {
        return diceValues.reduce((acc, value) => acc + value, 0);
    };

    const updateScore = (category, score) => {
        if (scorecard[category] === null) {
            // Calculate the score based on the chosen category and update the scorecard.
            let calculatedScore = 0;

            switch (category) {
                case 'ones':
                    calculatedScore = calculateOnes(diceValues);
                    break;
                case 'twos':
                    calculatedScore = calculateTwos(diceValues);
                    break;
                case 'threes':
                    calculatedScore = calculateThrees(diceValues);
                    break;
                case 'fours':
                    calculatedScore = calculateFours(diceValues);
                    break;
                case 'fives':
                    calculatedScore = calculateFives(diceValues);
                    break;
                case 'sixes':
                    calculatedScore = calculateSixes(diceValues);
                    break;
                case 'threeOfAKind':
                    calculatedScore = calculateThreeOfAKind(diceValues);
                    break;
                case 'fourOfAKind':
                    calculatedScore = calculateFourOfAKind(diceValues);
                    break;
                case 'fullHouse':
                    calculatedScore = calculateFullHouse(diceValues);
                    break;
                case 'smallStraight':
                    calculatedScore = calculateSmallStraight(diceValues);
                    break;
                case 'largeStraight':
                    calculatedScore = calculateLargeStraight(diceValues);
                    break;
                case 'yahtzee':
                    calculatedScore = calculateYahtzee(diceValues);
                    break;
                case 'chance':
                    calculatedScore = calculateChance(diceValues);
                    break;
                default:
                    // Handle invalid category.
                    break;
            }

            // Notify the server of the score update.
            notifyServerOfScoreUpdate(category, calculatedScore);

            // Update the score in the scorecard.
            const updatedScorecard = { ...scorecard };
            updatedScorecard[category] = calculatedScore;

            // Calculate the total score.
            let total = 0;
            for (const key in updatedScorecard) {
                if (updatedScorecard[key] !== null) {
                    total += updatedScorecard[key];
                }
            }
            updatedScorecard.totalScore = total;

            // Update the state.
            setScorecard(updatedScorecard);

            // Notify the server of the score update.
            // You will need to implement this communication.
        }
    };


    const notifyServerOfScoreUpdate = (category, score) => {
        // Send a message to the server with the updated score.
        hubConnection.invoke('UpdateScore', category, score)
            .catch(error => {
                console.error('Error sending score update:', error);
            });
    };

    return (
  <div>
    <h2>Scorecard</h2>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ones</td>
          <td onClick={() => updateScore('ones', /* calculate score */)}>
            {scorecard.ones !== null ? scorecard.ones : ''}
          </td>
        </tr>
        <tr>
          <td>Twos</td>
          <td onClick={() => updateScore('twos', /* calculate score */)}>
            {scorecard.twos !== null ? scorecard.twos : ''}
          </td>
        </tr>
        <tr>
          <td>Threes</td>
          <td onClick={() => updateScore('threes', /* calculate score */)}>
            {scorecard.threes !== null ? scorecard.threes : ''}
          </td>
        </tr>
        <tr>
          <td>Fours</td>
          <td onClick={() => updateScore('fours', /* calculate score */)}>
            {scorecard.fours !== null ? scorecard.fours : ''}
          </td>
        </tr>
        <tr>
          <td>Fives</td>
          <td onClick={() => updateScore('fives', /* calculate score */)}>
            {scorecard.fives !== null ? scorecard.fives : ''}
          </td>
        </tr>
        <tr>
          <td>Sixes</td>
          <td onClick={() => updateScore('sixes', /* calculate score */)}>
            {scorecard.sixes !== null ? scorecard.sixes : ''}
          </td>
        </tr>
        <tr>
          <td>Three of a Kind</td>
          <td onClick={() => updateScore('threeOfAKind', /* calculate score */)}>
            {scorecard.threeOfAKind !== null ? scorecard.threeOfAKind : ''}
          </td>
        </tr>
        <tr>
          <td>Four of a Kind</td>
          <td onClick={() => updateScore('fourOfAKind', /* calculate score */)}>
            {scorecard.fourOfAKind !== null ? scorecard.fourOfAKind : ''}
          </td>
        </tr>
        <tr>
          <td>Full House</td>
          <td onClick={() => updateScore('fullHouse', /* calculate score */)}>
            {scorecard.fullHouse !== null ? scorecard.fullHouse : ''}
          </td>
        </tr>
        <tr>
          <td>Small Straight</td>
          <td onClick={() => updateScore('smallStraight', /* calculate score */)}>
            {scorecard.smallStraight !== null ? scorecard.smallStraight : ''}
          </td>
        </tr>
        <tr>
          <td>Large Straight</td>
          <td onClick={() => updateScore('largeStraight', /* calculate score */)}>
            {scorecard.largeStraight !== null ? scorecard.largeStraight : ''}
          </td>
        </tr>
        <tr>
          <td>Yahtzee</td>
          <td onClick={() => updateScore('yahtzee', /* calculate score */)}>
            {scorecard.yahtzee !== null ? scorecard.yahtzee : ''}
          </td>
        </tr>
        <tr>
          <td>Chance</td>
          <td onClick={() => updateScore('chance', /* calculate score */)}>
            {scorecard.chance !== null ? scorecard.chance : ''}
          </td>
        </tr>
      </tbody>
    </table>
    <div>Total Score: {scorecard.totalScore}</div>
  </div >
);

}

export default Scorecard;
