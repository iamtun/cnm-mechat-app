import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../../config';
import io from 'socket.io-client/dist/socket.io';

//Chưa kết nối được với socket server
const socket = io('https://cnm-iuh-web-socket.herokuapp.com', {
    transports: ['websocket']
});

const messageListSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessagesById.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                socket.emit('addUser', action.payload.senderID);
                socket.emit('sendMessage', action.payload);
                console.log(socket);
                state.data.push(action.payload);
            });
    },
});

export const fetchMessagesById = createAsyncThunk('messages/fetchMessagesById', async (id) => {
    if (id) {
        try {
            const res = await fetch(`${config.LINK_API_V2}/messages/${id}`);
            const messages = await res.json();
            return messages;
        } catch (err) {
            console.log(`[fetch messages]: ${err}`);
        }
    }
});

export const sendMessage = createAsyncThunk('messages/add', async (message) => {
    if (message) {
        const { conversationID } = message;
        console.log(conversationID);
        const res = await fetch(`${config.LINK_API_V2}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const _message = await res.json();
        //console.log(`receiver messages: ${JSON.stringify(_message)}`);
        return _message;
    }
});
export default messageListSlice;
