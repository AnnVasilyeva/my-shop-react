import { createSlice } from '@reduxjs/toolkit';
import ShopService from './service';

const shopService = new ShopService();


const cartMaker = createSlice({
  name: 'cartMaker',
  initialState: {cart: [], loading: 'idle', error: null, cart_posted: false},
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteProduct: (state,action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(shopService.postCart.pending, (state) => {
      state.loading = 'loading'
      state.error = null
      state.cart_posted = false
    })
    .addCase(shopService.postCart.fulfilled, (state) => {
      state.loading = 'idle'
      state.cart = []
      state.error = null
      state.cart_posted = true
    })
    .addCase(shopService.postCart.rejected, (state) => {
      state.loading = 'failed'
      state.error = 'Что-то пошло не так'
      state.cart_posted = false
    })
  },
})

export const {addToCart, deleteProduct,} = cartMaker.actions;

export default cartMaker.reducer
