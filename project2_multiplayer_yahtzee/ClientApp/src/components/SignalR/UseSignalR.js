import { useEffect, useState } from 'react';
import { signalRHub } from './SignalRHub';

const sendMessage = async (user, message) => {
    await signalRHub.invoke('SendMessage', user, message);
}

const Selector = async (id, choice, userName) => {
    await signalRHub.invoke('ManagePoints', id, choice, userName);
}

export default function useSignalR() {
    const [value, setValue] = useState(null); // Add a new state for the random number

    useEffect(() => {

        const handleValue = (number) => {
            setValue(number); // Update state with the received random number
        };

        signalRHub.on('RecievePointNumber', handleValue);

        if (signalRHub.state === 'Disconnected') {
            signalRHub.start().catch(err => console.error('Failed to start SignalR:', err));
        }

        return () => {
            signalRHub.off('RecievePointNumber', handleValue); // Stop listening when the component unmounts
            if (signalRHub.state === 'Connected') {
                signalRHub.stop();
            }
        }
    }, []);

    return { value }; // Return both the received roll and the random number from the hook
}

export {
    useSignalR,
    sendMessage,
    Selector
};
