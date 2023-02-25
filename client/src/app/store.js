import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import productReducer from './features/products/productSlice'
import favReducer  from './features/favs/favSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        fav: favReducer
    }
})