import { configureStore } from '@reduxjs/toolkit';
import messageListSlice from './slice/messageSlice';
import filterSlice from './slice/filterSlice';
import userListSlice from './slice/usersSlice';
import userInfoSlice from './slice/userInfoSlice';
import friendListByUserId from './slice/friendSlice';

const store = configureStore({
    reducer: {
        messages: messageListSlice.reducer,
        filters: filterSlice.reducer,
        users: userListSlice.reducer,
        info: userInfoSlice.reducer,
        friends: friendListByUserId.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export default store;
