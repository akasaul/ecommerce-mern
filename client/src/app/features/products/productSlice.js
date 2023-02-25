import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productAPI from './productAPI'

const initialState = {
    products: [],
    product: {
        product: {},
        isSuccess: false, 
        isError: false,
        isLoading: false,
        message: ''
    },
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

const API_URL = '/product'

// Get Products 
export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (thunkAPI) => {
        try {
            const data =  await productAPI.getProducts(API_URL);
            return data; 
        } catch(error) {
            console.log(error);
            const message = error.response.data.msg || 'Failed to get the product';
            return thunkAPI.rejectWithValue(message);
        }
    }
) 

// Add product 
export const addProduct = createAsyncThunk(
    'product/addProduct',
    async(productData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user?.token;
            return await productAPI.addProduct(productData, token, API_URL + '/add-product');
        } catch(error) {
            const message = error.response.data.msg || 'Failed to add the product';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// get one product
export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (id, thunkAPI) => {
        try {
            return await productAPI.getProduct(API_URL + `/${id}`);
        } catch(error) {
            const message = error.response.data.msg || 'Failed to get the product';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Update product 
export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async(productData, thunkAPI) => {
        const {id} = productData;
        try {
            const token = thunkAPI.getState().user.user?.token;
            return await productAPI.updateProduct(productData, token, API_URL + '/' + id);
        } catch(error) {
            console.log(error);
            const message = error.response.data.msg || 'Failed to add the product';
            return thunkAPI.rejectWithValue(message);
        }
    }
)


// Delete product 
export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async(id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user?.token;
            return await productAPI.deleteProduct(token, API_URL + '/' + id);
        } catch(error) {
            console.log(error);
            const message = error.response.data.msg || 'Failed to add the product';
            return thunkAPI.rejectWithValue(message);
        }
    }
)


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            // getProducts state 
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            }) 
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            }) 
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }) 

            // add product state 
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            }) 
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            }) 
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }) 


            // get Product states 
            .addCase(getProduct.pending, (state) => {
                // state.isLoading = true;
                // state.isError = false;
                // state.isSuccess = false;
                // state.message = '';
                state.product.isLoading = true;
                state.product.isError = false;
                state.product.isSuccess = false;
                state.product.message = '';
            }) 
            .addCase(getProduct.fulfilled, (state, action) => {
                state.product.product =  action.payload;
                state.product.isSuccess = true;
                state.product.isLoading = false;
            }) 
            .addCase(getProduct.rejected, (state, action) => {
                state.product.isLoading = false;
                state.product.isError = true;
                state.product.message = action.payload;
            }) 


            // update One product state 

            .addCase(updateProduct.pending, (state) => {
                state.product.isLoading = true;
                state.product.isError = false;
                state.product.isSuccess = false;
                state.product.message = '';
            }) 
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.product.product =  action.payload;
                state.product.isSuccess = true;
                state.product.isLoading = false;
            }) 
            .addCase(updateProduct.rejected, (state, action) => {
                state.product.isLoading = false;
                state.product.isError = true;
                state.product.message = action.payload;
            }) 

            // Delete product state 

            .addCase(deleteProduct.pending, (state) => {
                state.product.isLoading = true;
                state.product.isError = false;
                state.product.isSuccess = false;
                state.product.message = '';
            }) 
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.product.product =  action.payload;
                state.product.isSuccess = true;
                state.product.isLoading = false;
            }) 
            .addCase(deleteProduct.rejected, (state, action) => {
                state.product.isLoading = false;
                state.product.isError = true;
                state.product.message = action.payload;
            }) 
    }
})

export const productSelector = state => state.product.product.product;


export const { reset } = productSlice.actions
export default productSlice.reducer;
