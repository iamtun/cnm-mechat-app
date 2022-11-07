import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config, { socket } from '../../config';

const friendListSlice = createSlice({
    name: 'friends',
    initialState: { data: [], friendId: null, userId: null, phoneNumbers: [], friendOnline: [] },
    reducers: {
        clickSendChat: (state, action) => {
            state.friendId = action.payload;
        },
        friendRequestReceiverSocket: (state, action) => {
            state.data.push(action.payload);
        },
        receiveFriendOnlineWithSocket: (state, action) => {
            state.friendOnline = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFriendsRequest.fulfilled, (state, action) => {
                if (action.payload) {
                    socket.emit('send_friend_request', { request: action.payload.data });
                } else console.warn('exists request!');
            })
            .addCase(fetchLoadFriendsRequest.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchListFriendRequestSent.fulfilled, (state, action) => {
                //state.data = action.payload;
            })
            .addCase(fetchHandleFriendsRequest.fulfilled, (state, action) => {
                const { friendRequestID, listFriendsReceiver, listFriendsSender, idReceiver, idSender} = action.payload;
                const index = state.data.findIndex((request) => request.idFriendRequest === friendRequestID);
                state.data.splice(index, 1);

                if(friendRequestID, listFriendsReceiver && listFriendsSender && idReceiver && idSender) {
                    socket.emit('accept_friend_request', ({listFriendsReceiver, listFriendsSender, idReceiver, idSender}));
                }
            });
    },
});

export const fetchFriendsRequest = createAsyncThunk('friends/fetchFriendsRequest', async (data) => {
    try {
        const res = await fetch(`${config.LINK_API_V4}/friendRequests/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const friendRequest = await res.json();
        // console.log("---friendRequest",friendRequest);
        if (friendRequest?.data) return friendRequest;
        return null;
    } catch (err) {
        console.warn(`[fetchFriendsRequest]: ${err}`);
    }
});

export const fetchLoadFriendsRequest = createAsyncThunk('friends/fetchLoadFriendsRequest', async (id) => {
    if (id) {
        try {
            const res = await fetch(`${config.LINK_API_V4}/friendRequests/get-list-request/${id}`);
            const allFriendRequest = await res.json();
            // console.log("----allFriendRequest",allFriendRequest);
            return allFriendRequest.data;
        } catch (err) {
            console.warn(`[fetchLoadFriendsRequest]: ${err}`);
        }
    }
});

export const fetchHandleFriendsRequest = createAsyncThunk('friends/fetchHandleFriendsRequest', async (data) => {
    try {
        const { idFriendRequest } = data;

        const { status, senderID, receiverID } = data;

        const res = await fetch(`${config.LINK_API_V4}/friendRequests/friend-request/${idFriendRequest}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, senderID, receiverID }),
        });
        const user = await res.json();
        console.log('result accept', user);
        return user;
    } catch (err) {
        console.warn(`[fetchHandleFriendsRequest]: ${err}`);
    }
});

export const fetchBackFriendRequest = createAsyncThunk('friends/fetchBackFriendRequest', async (data) => {
    try {
        const { friendRequestID } = data;
        const { status, senderID } = data;

        const res = await fetch(`${config.LINK_API_V4}/friendRequests/${friendRequestID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, senderID }),
        });
        const dataBackFriendsRequest = res.json();
        return dataBackFriendsRequest.data;
    } catch (err) {
        console.warn(`[fetchBackFriendRequest]: ${err}`);
    }
});

export const fetchListFriendRequestSent = createAsyncThunk('friends/fetchListFriendRequestSent', async (id) => {
    if (id) {
        try {
            const res = await fetch(`${config.LINK_API_V4}/friendRequests/get-of-me/${id}`);
            const allFriendRequestSent = await res.json();
            return allFriendRequestSent.data;
        } catch (err) {
            console.warn(`[fetchListFriendRequestSent]: ${err}`);
        }
    }
});
export default friendListSlice;
