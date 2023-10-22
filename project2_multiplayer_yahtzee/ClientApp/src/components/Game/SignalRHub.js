import { HubConnectionBuilder } from '@microsoft/signalr';

const signalRHub = new HubConnectionBuilder()
    .withUrl('https://localhost:7015/signalRHub')
    .build();

const sendMessage = async (user, message) => {
    await signalRHub.invoke('SendMessage', user, message);
}

const diceRolls = async (roll) => {
    await signalRHub.invoke('DiceRolls', roll);
}

export {
    signalRHub,
    sendMessage,
    diceRolls
};
