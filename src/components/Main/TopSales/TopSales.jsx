import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import Loader from '../../Loader/Loader';
import './topSales.css';

export default function TopSales () {
  const topSales = useSelector((state) => state.shopSlice.top_sales);
  const loading = useSelector((state) => state.shopSlice.loading);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading === 'loading' &&
      <Loader/>
      }
      {
        loading === 'idle' &&
      <div className="row">
       {
         topSales.length > 0 &&
         topSales.map((item) => <ProductCard card={item} key={item.id}/>)
       }
      </div>
      }
      
      
    </section>
  )
}