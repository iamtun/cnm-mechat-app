import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../config";

const friendListSlice = createSlice({
  name: "friends",
  initialState: { data: [], friendId: null, userId: null},
  reducers: {
    clickSendChat: (state, action) => {
      state.friendId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendsRequest.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchLoadFriendsRequest.fulfilled, (state, action) => {
        state.data = action.payload;
      })
  },
});

export const fetchFriendsRequest = createAsyncThunk(
  "friends/fetchFriendsRequest",
  async (data) => {
    try {
      const res = await fetch(`${config.LINK_API_V2}/friendRequests/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const friendRequest = await res.json();
      return friendRequest;
    } catch (err) {
      console.log(`err fetch users: ${err}`);
    }
  }
);

export const fetchLoadFriendsRequest = createAsyncThunk(
  "friends/fetchLoadFriendsRequest",
  async (id) => {
    if (id) {
      try {
        const res = await fetch(
          `${config.LINK_API_V2}/friendRequests/get-list-request/${id}`
        );
        const allFriendRequest = await res.json();
        return allFriendRequest.data;
      } catch (err) {
        console.log(`[fetch messages]: ${err}`);
      }
    }
  }
);

export const fetchHandleFriendsRequest = createAsyncThunk(
  "friends/fetchHandleFriendsRequest",
  async (data) => {
    try {
      const {idFriendRequest} = data;
     
      const {status, senderID, receiverID} = data;
      
      await fetch(`${config.LINK_API_V2}/friendRequests/friend-request/${idFriendRequest}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({status, senderID, receiverID}),
      });
    } catch (err) {
      console.log(`err fetch users: ${err}`);
    }
  }
);

export const fetchBackFriendRequest = createAsyncThunk(
  "friends/fetchBackFriendRequest",
  async (data) => {
    try {
      const {friendRequestID} = data;
     
      const {status, senderID} = data;
      
      const res = await fetch(`${config.LINK_API_V2}/friendRequests/${friendRequestID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({status, senderID}),
      });
      const dataBackFriendsRequest = res.json()
      console.log("Data back", dataBackFriendsRequest);
      return dataBackFriendsRequest.data;
    } catch (err) {
      console.log(`err fetch users: ${err}`);
    }
  }
);
export default friendListSlice;
