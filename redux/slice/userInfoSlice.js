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
        state.data = action.payload;
      })
      .addCase(fetchUserByPhone.fulfilled, (state, action) => {
        state.data = action.payload;
      });
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
export default userInfoSlice;
