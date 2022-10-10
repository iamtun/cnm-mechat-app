import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import config from '../../config';

const messageListSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
    },
    reducers: {
        sendMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessagesById.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
});

export const fetchMessagesById = createAsyncThunk("messages/fetchMessagesById", async(id) =>{
    if(id) {
        try{
            const res = await fetch(`${config.LINK_API_V2}/messages/${id}`)
            const messages = await res.json();

            return messages;
        }catch(err) {
            console.log(`[fetch messages]: ${err}`);
        }
    }
})
export default messageListSlice;
