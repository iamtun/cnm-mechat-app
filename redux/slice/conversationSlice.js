import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import config from '../../config';
import { getItem } from '../../utils/asyncStorage';
const conversationsListByUserId = createSlice({
    name: 'conversations',
    initialState: { data: [] , conversationId: null},
    reducers: {
        clickGroupChat: (state, action) => {
            state.conversationId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConversations.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

/**
 * get success full conversation of account user by id
 */
export const fetchConversations = createAsyncThunk('conversations/fetchConversations', async () => {
    try {
        const token = await getItem('user_token');
        const { _id } = jwtDecode(token);
        const res = await fetch(`${config.LINK_API_V2}/conversations/${_id}`);
        const conversations = await res.json();

        return conversations.data.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
    } catch (err) {
        console.log(`[fetchConversations]: ${err}`);
    }
});

export default conversationsListByUserId;
