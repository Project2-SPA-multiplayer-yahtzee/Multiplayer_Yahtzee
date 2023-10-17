import { HubConnectionBuilder } from '@microsoft/signalr';

const chatHub = new HubConnectionBuilder()
    .withUrl('https://localhost:7015/chathub')
    .build();

const sendMessage = async (user, message) => {
    await chatHub.invoke('SendMessage', user, message);
}

export {
    chatHub,
    sendMessage
};
