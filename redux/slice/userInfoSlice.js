import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { Alert } from "react-native";
import config, { socket, createFormData } from "../../config";

const userInfoSlice = createSlice({
  name: "info",
  initialState: { data: null, userId: null },
  reducers: {
    clickSearchItem: (state, action) => {
      state.userId = action.payload;
    },
    clickSearchUserByPhone: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        console.log("get info user success!");
        state.data = action.payload;
      })
      .addCase(fetchUserByPhone.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchUpdateAvatarUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        Alert.alert("Thông báo", "Cập nhật ảnh đại diện thành công!");
      })
      .addCase(fetchUpdateBackgroundUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        Alert.alert("Thông báo", "Cập nhật ảnh bìa thành công!");
      })
      .addCase(fetchUpdateInfoUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        Alert.alert("Thông báo", "Cập nhật thông tin thành công!");
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
        console.log(userInfo.data);
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
      const { userID } = data;

      const { fullName, gender, birthday, bio } = data;

      const res = await fetch(`${config.LINK_API_V2}/users/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, gender, birthday, bio }),
      });

      const userInfo = await res.json();
      console.log(userInfo);
      return userInfo;
    } catch (err) {
      console.log(`err fetch users: ${err}`);
    }
  }
);

export const fetchUpdateAvatarUsers = createAsyncThunk(
  "info/fetchUpdateAvatarUsers",
  async (data) => {
    try {
      let dataForm;
      dataForm = createFormData(data.avatarLink, data.key);
      const res = await fetch(
        `${config.LINK_API_V2}/users/update-avatar/${data.userID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: dataForm,
        }
      );
      const userInfo = await res.json();
      console.log(userInfo);
      return userInfo;
    } catch (err) {
      console.log(`err fetch avatar user info: ${err}`);
    }
  }
);

export const fetchUpdateBackgroundUsers = createAsyncThunk(
  "info/fetchUpdateBackgroundUsers",
  async (data) => {
    try {
      let dataForm;
      dataForm = createFormData(data.backLink, data.key);

      const res = await fetch(
        `${config.LINK_API_V2}/users/update-background/${data.userID}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: dataForm,
        }
      );

      const background = await res.json();
      console.log("----background",background);
      return background;
    } catch (err) {
      console.log(`err fetch background user info: ${err}`);
    }
  }
);

export const fetchForgetPassword = createAsyncThunk(
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
