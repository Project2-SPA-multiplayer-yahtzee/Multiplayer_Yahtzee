﻿import { useState, useEffect } from 'react';
import { signalRHub, diceRolls } from './SignalRHub';

function Roll({ updateDiceValues }) {
    const [rollList, setRollList] = useState([]);

    useEffect(() => {
        signalRHub.on('RecieveRoll', (roll) => {
            setRollList(prev => [...prev, { roll }]);
        });

        signalRHub.start(); //signalRHub.stop to close connection
    }, []);

    const sendRoll = async () => {
        // Generate 5 dice rolls
        for (let i = 0; i < 5; i++) {
            const newRoll = Math.floor(Math.random() * 6) + 1;
            updateDiceValues(rollList);
            await diceRolls(newRoll);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="list-group mt-3">
                        {rollList.map((rollObj, index) => (
                            <div key={index} className="list-group-item">
                                {rollObj.roll}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-12">
                    <div className="input-group mt-3">
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={sendRoll}>
                                Roll Dice
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Roll;
