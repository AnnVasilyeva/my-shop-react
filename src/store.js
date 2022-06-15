import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './reducer'
import { loadState } from './localStorage';

export const store = configureStore({
  reducer: {
    shopSlice: shopReducer,
  },
  preloadedState: loadState(),
})
