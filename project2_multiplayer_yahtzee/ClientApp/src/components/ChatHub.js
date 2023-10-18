import { HubConnectionBuilder } from '@microsoft/signalr';

const chatHub = new HubConnectionBuilder()
    .withUrl('https://localhost:7015/chathub')
    .build();

const sendMessage = async (user, message) => {
    await chatHub.invoke('SendMessage', user, message);
}

const diceRolls = async (roll) => {
    await chatHub.invoke('DiceRolls', roll);
}

export {
    chatHub,
    sendMessage,
    diceRolls
};
