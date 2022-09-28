import { configureStore } from '@reduxjs/toolkit';
import messageListSlice from './slice/MessageSlice';

const store = configureStore({
    reducer: {
        messages: messageListSlice.reducer,
    },
});

export default store;