import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filters",
    initialState: {
        search: ""
    },
    reducers: {
        searchFilterChange: (state, action) => {
            //console.log(action.payload);
            state.search = action.payload;
        }
    }
})

export default filterSlice;