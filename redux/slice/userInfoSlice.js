import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import config, { socket } from "../../config";

const userInfoSlice = createSlice({
  name: "info",
  initialState: { data: null, userId: null },
  reducers: {
    clickSearchItem: (state, action) => {
      state.userId = action.payload;
    },
    clickSearchUserByPhone: (state, action) => {
      state.phoneNumber = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        console.log('get info user success!');
        state.data = action.payload;
      })
      .addCase(fetchUserByPhone.fulfilled, (state, action) => {
        state.data = action.payload;
      })
  },
});

/**
 * get user info by id
 */
export const fetchUserInfo = createAsyncThunk(
  "info/fetchUserInfo",
  async (token) => {
    const _token = token;
    if (_token) {
      const info = jwtDecode(_token);
      const { _id } = info;

      //call socket
      socket.emit("addUser", _id);

      try {
        const res = await fetch(`${config.LINK_API_V2}/users/${_id}`);
        const userInfo = await res.json();
        return userInfo.data;
      } catch (err) {
        console.log(`[fetch userInfo]: ${err}`);
      }
    }
  }
);
/**
 * get user info by phone
 */
export const fetchUserByPhone = createAsyncThunk(
  "info/fetchUserByPhone",
  async (phone) => {
    if (phone) {
      try {
        const res = await fetch(
          `${config.LINK_API_V2}/users/get-user-by-phone/${phone}`
        );
        const userInfoByPhone = await res.json();
        return userInfoByPhone;
      } catch (err) {
        console.log(`[fetch messages]: ${err}`);
      }
    }
  }
);

export const fetchUpdateInfoUsers = createAsyncThunk(
  "info/fetchUpdateInfoUsers",
  async (data) => {
    try {
      const {userID} = data;
     
      const {fullName, gender, birthday, bio} = data;
      
      await fetch(`${config.LINK_API_V2}/users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({fullName, gender, birthday, bio}),
      });
    } catch (err) {
      console.log(`err fetch users: ${err}`);
    }
  }
);

export const fetchUpdateAvatarUsers = createAsyncThunk(
  "info/fetchUpdateAvatarUsers",
  async (data) => {
    try {
      const {userID} = data;
     
      const {avatarLink} = data;
      
      await fetch(`${config.LINK_API_V2}/update-avatar/${userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({avatarLink}),
      });
    } catch (err) {
      console.log(`err fetch users: ${err}`);
    }
  }
);

export const fetchUpdateBackgroundUsers = createAsyncThunk(
  "info/fetchUpdateBackgroundUsers",
  async (data) => {
    try {
      const {userID} = data;
     
      const {backLink} = data;
      
      console.log("-----BACK LINK", backLink);
      await fetch(`${config.LINK_API_V2}/update-background/${userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({backLink}),
      });
      console.log("SUCESSS");
    } catch (err) {
      console.log(`err fetch users: ${err}`);
    }
  }
);


export const fetchForgetPassword= createAsyncThunk(
  "info/fetchForgetPassword",
  async (data) => {
    try {
      console.log("Data", data);
      await fetch(`${config.LINK_API_V2}/accounts/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(`err fetch users: ${err}`);
    }
  }
);

export default userInfoSlice;
