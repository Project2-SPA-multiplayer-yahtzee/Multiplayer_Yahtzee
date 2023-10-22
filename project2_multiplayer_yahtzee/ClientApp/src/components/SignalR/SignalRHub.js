import { HubConnectionBuilder } from '@microsoft/signalr';

const signalRHub = new HubConnectionBuilder()
    .withUrl('https://localhost:7015/signalrhub')
    .build();

const generateRandomNumber = async () => {
    await signalRHub.invoke('GenerateRandomNumber');
}

export {
    signalRHub,
    generateRandomNumber // Export the new function
};
