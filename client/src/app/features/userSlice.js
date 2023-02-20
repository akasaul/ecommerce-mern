import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    initialValue: {
        name: '',
        email: '',
        token: ''
    },
    reducers: {},
    extraReducers: (buider) => {}
});

export default userSlice.reducer;