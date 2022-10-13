import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../config';

const friendRequestSlice = createSlice({
    name: 'friendRequest',
    initialState: {data: []},
    extraReducers: (builder) => {
        builder.addCase(fetchFriendsRequest.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
});

export const fetchFriendsRequest = createAsyncThunk('friendRequest/fetchFriendsRequest', async(data) => {
    try{

        const res = await fetch(`${config.LINK_API_V2}/friendRequests/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const friendRequest = await res.json();
        console.log("---friend request", friendRequest);
        return friendRequest;
    }catch(err) {
        console.log(`err fetch users: ${err}`);
    }
});

export default fetchFriendsRequest;
