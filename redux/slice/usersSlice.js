import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../config';

const userListSlice = createSlice({
    name: 'users',
    initialState: {data: []},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    try{
        const res = await fetch(`${config.LINK_API}/users`);
        const users = await res.json();
        return users.data;
    }catch(err) {
        console.log(`err fetch users: ${err}`);
    }
});

export default userListSlice;
