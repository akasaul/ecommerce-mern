import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import favAPI from './favAPI'

const API_URL = '/user/favs'

const initialState = {
    favs: []
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


const favReducer = createSlice({
    name: 'fav',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleFav.fulfilled, (state, action) => {
                console.log(state.favs);
                state.favs = action.payload;
            })
            .addCase(toggleFav.rejected, (state, action) => {
                console.log(action.payload);
            })
    }
}
)


export default favReducer.reducer;