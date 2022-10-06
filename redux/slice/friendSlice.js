import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../../config';

const friendListByUserId = createSlice({
    name: "friends",
    initialState: {data: []},
    extraReducers: (builder) => {
        builder.addCase(fetchFriends.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

//Lấy thành công list friends
export const fetchFriends = createAsyncThunk("friends/fetchFriends", async(id) => {
    try{
        const res = await fetch(`${config.LINK_API}/friends/${id}`);
        const friends = await res.json();
        return friends.data;
    }catch(err) {
        console.log(`[fetchFriends]: ${err}`);
    }
})

export default friendListByUserId;