import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config, { socket } from '../../config';

const friendListSlice = createSlice({
    name: 'friends',
    initialState: { data: [], friendId: null, userId: null, phoneNumbers: [] },
    reducers: {
        clickSendChat: (state, action) => {
            state.friendId = action.payload;
        },
        friendRequestReceiverSocket: (state, action) => {
            state.data.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFriendsRequest.fulfilled, (state, action) => {
                //state.data = action.payload;
                if(action.payload)
                    socket.emit("send_friend_request", {request: action.payload});
                else 
                    console.warn('exists request!');
            })
            .addCase(fetchLoadFriendsRequest.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchListFriendRequestSent.fulfilled, (state, action) => {
                //state.data = action.payload;
            });
    },
});

export const fetchFriendsRequest = createAsyncThunk('friends/fetchFriendsRequest', async (data) => {
    try {
        const res = await fetch(`${config.LINK_API_V3}/friendRequests/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const friendRequest = await res.json();
        console.log("---friend", friendRequest);
        if(friendRequest?.receiver)
            return friendRequest;
        return null;
    } catch (err) {
        console.log(`err fetch users: ${err}`);
    }
});

export const fetchLoadFriendsRequest = createAsyncThunk('friends/fetchLoadFriendsRequest', async (id) => {
    if (id) {
        try {
            const res = await fetch(`${config.LINK_API_V3}/friendRequests/get-list-request/${id}`);
            const allFriendRequest = await res.json();
            //console.log('allFriendRequest', allFriendRequest);
            return allFriendRequest.data;
        } catch (err) {
            console.log(`[fetch messages]: ${err}`);
        }
    }
});

export const fetchHandleFriendsRequest = createAsyncThunk('friends/fetchHandleFriendsRequest', async (data) => {
    try {
        const { idFriendRequest } = data;

        const { status, senderID, receiverID } = data;

        await fetch(`${config.LINK_API_V3}/friendRequests/friend-request/${idFriendRequest}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, senderID, receiverID }),
        });
    } catch (err) {
        console.log(`err fetch users: ${err}`);
    }
});

export const fetchBackFriendRequest = createAsyncThunk('friends/fetchBackFriendRequest', async (data) => {
    try {
        const { friendRequestID } = data;
        const { status, senderID } = data;

        const res = await fetch(`${config.LINK_API_V3}/friendRequests/${friendRequestID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, senderID }),
        });
        const dataBackFriendsRequest = res.json();
        return dataBackFriendsRequest.data;
    } catch (err) {
        console.log(`err fetch users: ${err}`);
    }
});

export const fetchListFriendRequestSent = createAsyncThunk('friends/fetchListFriendRequestSent', async (id) => {
    if (id) {
        try {
            const res = await fetch(`${config.LINK_API_V3}/friendRequests/get-of-me/${id}`);
            const allFriendRequestSent = await res.json();
            return allFriendRequestSent.data;
        } catch (err) {
            console.log(`[fetch messages]: ${err}`);
        }
    }
});
export default friendListSlice;
