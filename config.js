import { LINK_API_V2 } from '@env';
import { io } from 'socket.io-client';

console.log("API", LINK_API_V2);
export default {
    LINK_API_V2,
};

export const socket = io('https://73b6-171-252-153-134.ap.ngrok.io', {
    transports: ['websocket'],
    //reconnection: true,
    withCredentials: true
});