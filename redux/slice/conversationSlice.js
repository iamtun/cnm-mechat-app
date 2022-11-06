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
                    state.data = action.payload;
                    state.loading = false;
                }else {
                    console.warn('fetch conversations error!');
                }
            })
            .addCase(fetchConversations.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchCreateGroupChat.fulfilled, (state, action) => {
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
        const res = await fetch(`${config.LINK_API_V4}/conversations/${_id}`);
        const conversations = await res.json();

        if (conversations?.error) {
            console.warn(conversations);
            return null;
        };
        return conversations.data.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
    } catch (err) {
        console.log(`[fetchConversations]: ${err}`);
    }
});

export const fetchCreateGroupChat = createAsyncThunk('conversations/fetchCreateGroupChat', async (data) => {
    try {
        const res = await fetch(`${config.LINK_API_V4}/conversations/create-conversation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const groupChat = await res.json();
        return groupChat;
    } catch (err) {
        console.log(`err fetch group: ${err}`);
    }
})
export default conversationsListByUserId;
