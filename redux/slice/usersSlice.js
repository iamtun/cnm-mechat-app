import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import config from '../../config';

const userListSlice = createSlice({
    name: 'users',
    initialState: { data: [], loading: 0 },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                console.log('users is loading success!');
                state.data = action.payload;
                state.loading = 2;
            })
            .addCase(fetchUsers.pending, (state, action) => {
                console.log('users is loading...');
                state.loading = 1;
            });
    },
});

/**
 * get all users from server
 */
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const res = await fetch(`${config.LINK_API_V3}/users`);
        const users = await res.json();
        return users.data;
    } catch (err) {
        console.log(`err fetch users: ${err}`);
    }
});

export default userListSlice;
