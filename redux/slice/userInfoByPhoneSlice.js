import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import config from '../../config';

const messageListSlice = createSlice({
    name: 'userInfoByPhone',
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserByPhone.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
});

export const fetchUserByPhone = createAsyncThunk("userInfoByPhone/fetchUserByPhone", async(phone) =>{
    if(phone) {
        try{
            const res = await fetch(`${config.LINK_API_V2}/users/get-user-by-phone/${phone}`)
            const userInfoByPhone = await res.json();
            console.log("--- Use info by phone", userInfoByPhone);
            return userInfoByPhone;
        }catch(err) {
            console.log(`[fetch messages]: ${err}`);
        }
    }
})
export default messageListSlice;
