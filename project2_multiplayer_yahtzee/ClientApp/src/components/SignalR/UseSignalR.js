import { useEffect, useState } from 'react';
import { signalRHub } from './SignalRHub';

const sendMessage = async (user, message) => {
    await signalRHub.invoke('SendMessage', user, message);
}

const generateRandomNumber = async () => {
    await signalRHub.invoke('GenerateRandomNumber');
}

export default function useSignalR() {
    const [randomNumber, setRandomNumber] = useState(null); // Add a new state for the random number

    useEffect(() => {

        const handleRandomNumber = (number) => {
            setRandomNumber(number); // Update state with the received random number
        };

        signalRHub.on('ReceiveRandomNumber', handleRandomNumber); // Listen for the random number

        signalRHub.start().catch(err => console.error('Failed to start SignalR:', err));

        return () => {
            signalRHub.off('ReceiveRandomNumber', handleRandomNumber); // Stop listening when the component unmounts
            signalRHub.stop();
        }
    }, []);

    return { randomNumber }; // Return both the received roll and the random number from the hook
}

export {
    useSignalR,
    sendMessage,
    generateRandomNumber
};
