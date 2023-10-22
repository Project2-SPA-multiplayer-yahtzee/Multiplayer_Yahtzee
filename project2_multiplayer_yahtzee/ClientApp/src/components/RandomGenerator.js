import React from 'react';
import { useSignalR, generateRandomNumber } from './SignalR/UseSignalR';

function RandomGenerator() {
    const { randomNumber } = useSignalR();

    const handleClick = () => {
        generateRandomNumber();
    };

    return (
        <div>
            <button onClick={handleClick}>Generate Random Number</button>
            {randomNumber && <p>Random Number: {randomNumber}</p>}
        </div>
    );
}

export default RandomGenerator;
