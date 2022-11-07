import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import config from '../../config';
import { getItem } from '../../utils/asyncStorage';
const conversationsListByUserId = createSlice({
    name: 'conversations',
    initialState: { data: [], members: [],conversationId: null, loading: false },
    reducers: {
        clickGroupChat: (state, action) => {
            state.conversationId = action.payload;
        },
        getMembers: (state, action) => {
            state.members = action.payload;
        }
        
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
        if (conversations?.error) return null;
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

export const fetchRemoveMember =  createAsyncThunk('conversations/fetchRemoveMember', async (data) => {
    try {
        const {idConversation} = data;
        const {memberId, mainId} = data;

        const res = await fetch(`${config.LINK_API_V4}/conversations/delete-member/${idConversation}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({memberId, mainId}),
        });
        const memberRemove = await res.json();
        console.log("memberRemove", memberRemove);
    } catch (err) {
        console.log(`err fetch remove members: ${err}`);
    }
})

export const fetchOutGroup =  createAsyncThunk('conversations/fetchOutGroup', async (data) => {
    try {
        const {idConversation} = data;
        const {userId} = data;

        const res = await fetch(`${config.LINK_API_V4}/conversations/out-conversation/${idConversation}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId}),
        });
        const outGroup = await res.json();
        console.log("outGroup", outGroup);
    } catch (err) {
        console.log(`err fetch out group: ${err}`);
    }
})

export default conversationsListByUserId;
