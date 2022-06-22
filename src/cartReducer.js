import { createSlice} from '@reduxjs/toolkit';

const cartMaker = createSlice({
  name: 'cartMaker',
  initialState: {cart: []},
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteProduct: (state,action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
  }
})

export const {addToCart, deleteProduct,} = cartMaker.actions;

export default cartMaker.reducer
