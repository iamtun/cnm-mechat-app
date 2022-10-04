import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utils/asyncStorage";
import jwtDecode from "jwt-decode";
import config from "../../config";
const userInfoSlice = createSlice({
    name: "info",
    initialState: {data: null},
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

export const fetchUserInfo = createAsyncThunk("info/fetchUserInfo", async() => {
    const _token = await getItem("user_token");
    if(_token) {
        const info = jwtDecode(_token);
        const {_id} = info;
        try{
            const res = await fetch(`${config.LINK_API}/users/${_id}`);
            const userInfo = await res.json();
            return userInfo.data._user;
        }catch(err) {
            console.log(`[fetch userInfo]: ${err}`);
        }
    }
})

export default userInfoSlice;