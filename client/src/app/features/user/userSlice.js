import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from './userAPI'

// Sign up thunk
export const signup = createAsyncThunk(
    'user/signup',
    async (formData, thunkAPI) => {
        try {
            return await userAPI.signup(formData);
        } catch (err) {
            const message = err.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Log in thunk 
export const login = createAsyncThunk(
    'user/login',
    async (formData, thunkAPI) => {
        try {
            return await userAPI.login(formData);
        } catch (err) {
            const message = err.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }   
)

// User slice 

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            // Sign in states 
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = '';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(signup.rejected, (state, action) => {
                state.user = {};
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // Log in states 
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = '';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.user = {};
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


    }
});

export default userSlice.reducer;