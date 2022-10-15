import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config, { socket } from '../../config';

const messageListSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        receiverId: null,
    },
    reducers: {
        setReceiverId: (state, action) => {
            state.receiverId = action.payload;
        },
        addMessageFromSocket: (state, action) => {
            state.data.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessagesById.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.data.push(action.payload);
                //send success socket
                socket.emit('sendMessage', { message: action.payload, receiverID: state.receiverId});
            });
    },
});

/**
 * get all messages by user id
 */
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

/**
 * send message to server by conversation id
 * body: {conversation_id}
 * return message send success
 */
export const sendMessage = createAsyncThunk('messages/add', async (message) => {
    if (message) {
        const res = await fetch(`${config.LINK_API_V2}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const _message = await res.json();
        console.log(_message);
        return _message;
    }
});

export default messageListSlice;
