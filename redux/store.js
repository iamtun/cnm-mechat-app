import { configureStore } from '@reduxjs/toolkit';
import messageListSlice from './slice/messageSlice';
import filterSlice from './slice/filterSlice';
import userListSlice from './slice/usersSlice';
const store = configureStore({
    reducer: {
        messages: messageListSlice.reducer,
        filters: filterSlice.reducer,
        users: userListSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export default store;
