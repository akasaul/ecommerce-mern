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

// Get User 
export const getUser = createAsyncThunk(
    'user/getuser', 
    async (id, thunkAPI) => {
        try {
            return await userAPI.getUser(id);
        } catch(err) {
            console.log(err);
            const message = err.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
)


// Get Me 
export const getMe = createAsyncThunk(
    'user/getMe', 
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.token;
            return await userAPI.getMe(token);
        } catch(err) {
            console.log(err);
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
        logout: (state) => {
            localStorage.removeItem('user');
            state.user = undefined;
        }
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


            // Get user states 
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = '';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(getUser.rejected, (state, action) => {
                state.user = {};
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


            // Get Me 
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = '';
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

    }
});


export const {logout} = userSlice.actions;
export default userSlice.reducer;