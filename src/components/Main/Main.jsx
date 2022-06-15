import React from 'react';
import MainPage from './MainPage/MainPage';
import Catalog from './Catalog/Catalog';
import About from './About/About';
import Contacts from './Contacts/Contacts';
import ProductPage from './ProductPage/ProductPage';
import CartPage from './Cart/Cart';
import { Routes, Route } from "react-router-dom";
import './main.css';

export default function Main () {
  
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
        <Routes>
          <Route path="/"
                  element={<MainPage/>}
                  exact
          />
          <Route path="/catalog"
                  element={<Catalog isCatalogPage={false}/>}
          />
          <Route path="/catalog/:id"
                element={<ProductPage/>}
          />
          <Route path="/about"
                  element={<About/>}
          />
           <Route path="/contacts"
                  element={<Contacts/>}
          />
           <Route path="/cart"
                element={<CartPage/>}
          />
        </Routes>
        </div>
      </div>
    </main>
  )
}