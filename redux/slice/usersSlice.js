import { createSlice } from '@reduxjs/toolkit';

const userListSlice = createSlice({
    name: 'users',
    initialState: {
        data: [
            {
                _id: '6332c32e72aab6021264b315',
                fullName: 'Nguyễn Đức Huy',
                bio: 'Sông Lam',
                gender: 0,
                birthday: '2022-09-27T09:32:30.531Z',
                status: true,
                avatarLink: null,
                backgroundLink: null,
                accountID: '6332c32d72aab6021264b312',
                friendID: null,
                __v: 0,
            },

            {
                _id: '6332c32e72aab6021264b319',
                fullName: 'Nguyễn Đức Hùng',
                bio: 'Sông Lam',
                gender: 0,
                birthday: '2022-09-27T09:32:30.718Z',
                status: true,
                avatarLink: null,
                backgroundLink: null,
                accountID: '6332c32e72aab6021264b317',
                friendID: null,
                __v: 0,
            },

            {
                _id: '6332c32e72aab6021264b31d',
                fullName: 'Thu Thảo',
                bio: 'Sông Lam',
                gender: 0,
                birthday: '2022-09-27T09:32:30.896Z',
                status: true,
                avatarLink: null,
                backgroundLink: null,
                accountID: '6332c32e72aab6021264b31b',
                friendID: null,
                __v: 0,
            },
        ],
    },
});

export default userListSlice;