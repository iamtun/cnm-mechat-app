import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import config from '../../config';
import { getItem } from '../../utils/asyncStorage';
const conversationsListByUserId = createSlice({
    name: 'conversations',
    initialState: { data: [], conversationId: null, loading: false },
    reducers: {
        clickGroupChat: (state, action) => {
            state.conversationId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversations.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log('conversation loading success...');
                    state.data = action.payload;
                    state.loading = false;
                }else {
                    console.warn('fetch conversations error!');
                }
            })
            .addCase(fetchConversations.pending, (state, action) => {
                console.log('conversation loading...');
                state.loading = true;
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
        const res = await fetch(`${config.LINK_API_V3}/conversations/${_id}`);
        const conversations = await res.json();
        if (conversations?.error) return null;
        return conversations.data.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
    } catch (err) {
        console.log(`[fetchConversations]: ${err}`);
    }
});

export default conversationsListByUserId;
