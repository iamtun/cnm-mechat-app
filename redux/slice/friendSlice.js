import { createSlice } from '@reduxjs/toolkit';

const friendListSlice = createSlice({
    name: 'friends',
    initialState: { data: [], friendId: null },
    reducers: {
        clickSendChat: (state, action) => {
            state.friendId = action.payload;
        },
        loadDataFriend: (state, action) => {
            state.data = action.payload;
        }
    },

});


export default friendListSlice;
