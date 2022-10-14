import { LINK_API_V2 } from '@env';
import { io } from 'socket.io-client';

console.log("API", LINK_API_V2);
export default {
    LINK_API_V2,
};

export const socket = io('https://c498-113-22-34-182.ap.ngrok.io', {
    transports: ['websocket'],
    reconnection: true,
});