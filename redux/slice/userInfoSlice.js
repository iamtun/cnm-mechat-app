import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { Alert } from 'react-native';
import config, { socket, createFormDataUpdate } from '../../config';

const userInfoSlice = createSlice({
    name: 'info',
    initialState: { data: null, userId: null, loading: 0 },
    reducers: {
        clickSearchItem: (state, action) => {
            state.userId = action.payload;
        },
        clickSearchUserByPhone: (state, action) => {
            state.phoneNumber = action.payload;
        },
        refreshToLogout: (state, action) => {
            state.loading = 0;
        },
        receiveFriendListFromSocket: (state, action) => {
            state.data.friends = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = 2;
            })
            .addCase(fetchUserInfo.pending, (state, action) => {
                state.loading = 1;
            })
            .addCase(fetchUserByPhone.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchUpdateAvatarUsers.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchUpdateBackgroundUsers.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchUpdateInfoUsers.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchUserByID.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    },
});

/**
 * get user info by id
 */
export const fetchUserInfo = createAsyncThunk('info/fetchUserInfo', async (token) => {
    const _token = token;
    if (_token) {
        const info = jwtDecode(_token);
        const { _id } = info;

        //call socket
        socket.emit('status_user', _id);

        try {
            const res = await fetch(`${config.LINK_API_V4}/users/${_id}`);
            const userInfo = await res.json();

            return userInfo.data;
        } catch (err) {
            console.log(`[fetch userInfo]: ${err}`);
        }
    }
});
/**
 * get user info by phone
 */
export const fetchUserByPhone = createAsyncThunk('info/fetchUserByPhone', async (phone) => {
    if (phone) {
        try {
            const res = await fetch(`${config.LINK_API_V4}/users/get-user-by-phone/${phone}`);
            const userInfoByPhone = await res.json();
            return userInfoByPhone;
        } catch (err) {
            console.log(`[fetch messages]: ${err}`);
        }
    }
});

export const fetchUpdateInfoUsers = createAsyncThunk('info/fetchUpdateInfoUsers', async (data) => {
    try {
        const { userID } = data;

        const { fullName, gender, birthday, bio } = data;

        const res = await fetch(`${config.LINK_API_V4}/users/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, gender, birthday, bio }),
        });

        const userInfo = await res.json();
        return userInfo;
    } catch (err) {
        console.log(`err fetch users: ${err}`);
    }
});

export const fetchUpdateAvatarUsers = createAsyncThunk('info/fetchUpdateAvatarUsers', async (data) => {
    try {
        let dataForm;
        dataForm = createFormDataUpdate(data.avatarLink, data.key);
        console.log('dataForm', dataForm);
        const res = await fetch(`${config.LINK_API_V4}/users/update-avatar/${data.userID}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: dataForm,
        });
        const userInfo = await res.json();
        return userInfo;
    } catch (err) {
        console.log(`err fetch avatar user info: ${err}`);
    }
});

export const fetchUpdateBackgroundUsers = createAsyncThunk('info/fetchUpdateBackgroundUsers', async (data) => {
    try {
        let dataForm;
        dataForm = createFormDataUpdate(data.backLink, data.key);

        const res = await fetch(`${config.LINK_API_V4}/users/update-background/${data.userID}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: dataForm,
        });

        const background = await res.json();
        return background;
    } catch (err) {
        console.log(`err fetch background user info: ${err}`);
    }
});

export const fetchForgetPassword = createAsyncThunk('info/fetchForgetPassword', async (data) => {
    try {
        await fetch(`${config.LINK_API_V4}/accounts/forget-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } catch (err) {
        console.log(`err fetch users: ${err}`);
    }
});

export const fetchUserByID = createAsyncThunk('info/fetchUserByID', async (id) => {
    if (id) {
        try {
            const res = await fetch(`${config.LINK_API_V4}/users/${id}`);
            const userInfoByID = await res.json();
            return userInfoByID.data;
        } catch (err) {
            console.log(`[fetch messages]: ${err}`);
        }
    }
});

export default userInfoSlice;
