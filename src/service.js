import {createAsyncThunk} from '@reduxjs/toolkit';

export default class ShopService {
  _apiBase = 'http://localhost:7070/';

  fetchCategories = createAsyncThunk(
    'shopSlice/fetchCategories',
    async () => {
      const res = await fetch(`${this._apiBase}api/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      return await res.json();
    }
  )

  fetchProducts = createAsyncThunk(
    'shopSlice/fetchProducts',
    async () => {
      const res = await fetch(`${this._apiBase}api/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      return await res.json();
    }
  )

  updateProducts = createAsyncThunk(
    'shopSlice/updateProducts',
    async (id) => {
      const res = await fetch(`${this._apiBase}api/items?categoryId=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      return await res.json();
    }
  )

  uploadProducts = createAsyncThunk(
    'shopSlice/uploadProducts',
    async (id) => {
      const url = id === 11 ? 'api/items?offset=6' :
      `api/items?categoryId=${id}&offset=6`;

      const res = await fetch(`${this._apiBase}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      return await res.json();
    }
  )

  fetchTopSales = createAsyncThunk(
    'shopSlice/fetchTopSales',
    async () => {
      const res = await fetch(`${this._apiBase}api/top-sales`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      return await res.json();
    }
  )

  searchProducts = createAsyncThunk(
    'shopSlice/searchProducts',
    async (value) => {
      const res = await fetch(`${this._apiBase}api/items?q=${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      return await res.json();
    }
  )

  selectProduct = createAsyncThunk(
    'shopSlice/selectProduct',
    async (id) => {
      const res = await fetch(`${this._apiBase}api/items/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      return await res.json();
    }
  )

  postCart = createAsyncThunk(
    'cartMaker/postCart',
    async (post, {rejectWithValue}) => {
      try{
        await fetch(
          `${this._apiBase}api/order`,
          {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify(post),
            header: {
              'Content-Type': 'application/json',
            },
          }
        ).then((res) => res)
        
      } catch (err) {
        return rejectWithValue(err.message)
      }
        
        
    }
  )

}