import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from '../../config';
const conversationsListByUserId = createSlice({
    name: "conversations",
    initialState: {data: []},
    extraReducers: (builder) => {
        builder.addCase(fetchConversations.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

//Lấy thành công list conversations
export const fetchConversations = createAsyncThunk("conversations/fetchConversations", async(id) => {
    try{
        const res = await fetch(`${config.LINK_API_V2}/conversations/${id}`);
        const conversations = await res.json();
        //console.log(conversations.data);
        return conversations.data;
    }catch(err) {
        console.log(`[fetchConversations]: ${err}`);
    }
})


export default conversationsListByUserId;