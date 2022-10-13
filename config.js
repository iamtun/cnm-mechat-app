import { LINK_API_V2 } from '@env';
import { io } from 'socket.io-client';

console.log("API", LINK_API_V2);
export default {
    LINK_API_V2,
};

export const socket = io('https://9561-2402-800-63a9-e221-5d8f-3a7d-5ad4-da76.ap.ngrok.io', {
    transports: ['websocket'],
    reconnection: true,
});