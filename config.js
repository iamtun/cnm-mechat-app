import { LINK_API_V2 } from '@env';
import { io } from 'socket.io-client';

console.log("API", LINK_API_V2);
export default {
    LINK_API_V2,
};

export const socket = io('https://cnm-socket.herokuapp.com', {
    transports: ['websocket'],
    //reconnection: true,
    withCredentials: true
});