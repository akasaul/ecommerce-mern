import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import favAPI from './favAPI'

const API_URL = '/user/favs'

const initialState = {
    favs: [],
    pending: false
}


export const toggleFav = createAsyncThunk(
    'fav/toggleFav',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user?.token;
            return await favAPI.toggleFav(id, token, API_URL);
        } catch(err) {
            thunkAPI.rejectWithValue('Can\'t Like');
        }
    }
)

export const getFavs = createAsyncThunk(
    'fav/getFavs',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user?.token;
            return await favAPI.getFavs(token, API_URL);
        } catch(err) {
            thunkAPI.rejectWithValue('Can\'t Fetch liked');
        }
    }
)


const favReducer = createSlice({
    name: 'fav',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder
            // Toggle fav states 
            .addCase(toggleFav.fulfilled, (state, action) => {
                console.log(state.favs);
                state.pending = false;
                state.favs = action.payload;
            })
            .addCase(toggleFav.pending, (state) => {
                state.pending = true;
            })
            .addCase(toggleFav.rejected, (state, action) => {
                state.pending = false;
                console.log(action.payload);
            })

            // Get favs states 
            .addCase(getFavs.pending, (state, action) => {
                state.pending = true;
            })
            
            .addCase(getFavs.fulfilled, (state, action) => {
                state.favs = action.payload;
                state.pending = false;
            })
            .addCase(getFavs.rejected, (state, action) => {
                console.log(action.payload);
                state.pending = false;
            })
            
    }
}
)

export const favSelector = state => state.fav.favs;
export default favReducer.reducer;