import React from 'react';
import MainPage from './MainPage/MainPage';
import Catalog from './Catalog/Catalog';
import About from './About/About';
import Contacts from './Contacts/Contacts';
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
          <Route path="/about"
                  element={<About/>}
          />
           <Route path="/contacts"
                  element={<Contacts/>}
          />
        </Routes>
        </div>
      </div>
    </main>
  )
}