import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const {id,  qty} = action.payload;
            const index = state.cart.findIndex(item => item.id === id);   
            if(index !== -1) {
                state.cart[index].qty += qty;   
                localStorage.setItem('cart', JSON.stringify(state.cart));
            } else {
                state.cart.push(action.payload);
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        getCart: (state) => {
            return state.cart;
        },
        deleteItem: (state, action) => {
            console.log(action.payload);
            state.cart = state.cart.filter(item => item.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.setItem('cart', JSON.stringify([]));
        },
        updateQty: (state, action) => {
            const {id, qty} = action.payload;
            state.cart.find(item => item.id === id).qty = qty;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    }
})

export const {addToCart, getCart, deleteItem, clearCart, updateQty} = cartSlice.actions;
export default cartSlice.reducer;