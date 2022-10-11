import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import config from "../../config";

const userInfoSlice = createSlice({
  name: "info",
  initialState: { data: null, userId: null },
  reducers: {
    clickSearchItem: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const fetchUserInfo = createAsyncThunk(
  "info/fetchUserInfo",
  async (token) => {
    const _token = token;
    if (_token) {
      const info = jwtDecode(_token);
      const { _id } = info;

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

export default userInfoSlice;
