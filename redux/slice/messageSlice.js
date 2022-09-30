import { createSlice } from '@reduxjs/toolkit';

const messageListSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [
            {
                id: 'm1',
                content: 'How are you?',
                user: {
                    id: 'u1',
                    name: 'Le Tuan',
                    avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                },
                createAt: '22:30',
            },
            {
                id: 'm2',
                content: 'Fine, and u',
                user: {
                    id: 'u2',
                    name: 'Thanh Nho',
                    avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                },
                createAt: '22:35',
            },
            {
                id: 'm3',
                content: 'Fine, and u',
                user: {
                    id: 'u2',
                    name: 'Thanh Nho',
                    avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                },
                createAt: '22:35',
            },
            {
                id: 'm4',
                content: 'Fine, and u',
                user: {
                    id: 'u2',
                    name: 'Thanh Nho',
                    avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                },
                createAt: '22:35',
            },
            {
                id: 'm5',
                content: 'Fine, and u',
                user: {
                    id: 'u2',
                    name: 'Thanh Nho',
                    avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                },
                createAt: '22:35',
            },
            {
                id: 'm6',
                content: 'Fine, and you',
                user: {
                    id: 'u2',
                    name: 'Thanh Nho',
                    avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                },
                createAt: '22:35',
            },
            {
                id: 'm7',
                content: 'Học thì điện thoại lúc nào cũng bấm, Học thì điện thoại lúc nào cũng bấm',
                imageLink: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                user: {
                    id: 'u2',
                    name: 'Thanh Nho',
                    avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                },
                createAt: '22:35',
            },
            {
                id: 'm8',
                content: 'Ok!',
                imageLink: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                user: {
                    id: 'u1',
                    name: 'Le Tuan',
                    avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                },
                createAt: '22:35',
            },
            {
                id: 'm9',
                imageLink: 'https://zpsocial-f51-org.zadn.vn/2bb60175220bcc55951a.jpg',
                user: {
                    id: 'u2',
                    name: 'Thanh Nho',
                    avatar: 'https://cnm-s3-demo-9922.s3.ap-southeast-1.amazonaws.com/avatar.jpg',
                },
                createAt: '22:35',
            },
        ],
    },
    reducers: {
        sendMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
});

export default messageListSlice;
