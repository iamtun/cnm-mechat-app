import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import config from '../../config';
import { getItem } from '../../utils/asyncStorage';
const conversationsListByUserId = createSlice({
    name: 'conversations',
    initialState: { data: [] },
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
        //console.log(conversations.data);
        return conversations.data;
    } catch (err) {
        console.log(`[fetchConversations]: ${err}`);
    }
});

export default conversationsListByUserId;
