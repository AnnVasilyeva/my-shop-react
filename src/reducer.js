import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import ShopService from './service';

const shopService = new ShopService();

const shopAdapter = createEntityAdapter();

const initialState = {
  categories: [{id: 11, title: 'Все'}],
  products: [],
  top_sales: [],
  loading: 'idle', 
  error: null,
  search_value: '',
  selected_product: null,
}

const shopSlice = createSlice({
  name: 'shopSlice',
  initialState: shopAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(shopService.fetchCategories.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(shopService.fetchProducts.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(shopService.fetchTopSales.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(shopService.updateProducts.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(shopService.uploadProducts.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(shopService.searchProducts.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(shopService.selectProduct.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(shopService.fetchCategories.fulfilled, (state, action) => {
        state.categories = [...state.categories, ...action.payload];
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(shopService.fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(shopService.fetchTopSales.fulfilled, (state, action) => {
        state.top_sales = action.payload;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(shopService.updateProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(shopService.uploadProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(shopService.searchProducts.fulfilled, (state, action) => {
        state.search_value = action.meta.arg;
        state.products = action.payload;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(shopService.selectProduct.fulfilled, (state, action) => {
        state.selected_product = action.payload;
        state.loading = 'idle';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(shopService.fetchCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(shopService.fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(shopService.fetchTopSales.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(shopService.updateProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(shopService.uploadProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(shopService.searchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(shopService.selectProduct.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });

  },
})

export const {updateProducts, uploadProducts, searchProducts, selectProduct } = shopSlice.actions


export default shopSlice.reducer