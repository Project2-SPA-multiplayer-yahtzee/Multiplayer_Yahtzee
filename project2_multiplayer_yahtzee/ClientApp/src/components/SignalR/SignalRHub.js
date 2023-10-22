import { HubConnectionBuilder } from '@microsoft/signalr';

const signalRHub = new HubConnectionBuilder()
    .withUrl('https://localhost:7015/signalrhub')
    .build();

export {
    signalRHub,
};
