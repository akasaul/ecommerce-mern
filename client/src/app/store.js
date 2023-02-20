import {configureStore} from '@reduxjs/toolkit'


export const store = configureStore({
    user: userReducer
})