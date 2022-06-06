import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch } from 'react-redux';
import ShopService from '../../../service';
import './catalog.css';

const shopService = new ShopService(); 

export default function Catalog ({isCatalogPage = true}) {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.shopSlice.categories);
  const products = useSelector((state) => state.shopSlice.products);

  const [activeCategory, setActiveCategory] = useState(11);
  
  const changeCategory = (id) => {
    setActiveCategory(id);
    if(id === 11) {
      dispatch(shopService.fetchProducts()); 
    } else {
      dispatch(shopService.updateProducts(id));
    } 
  }

  const getLoadMoreCards = () => {
    dispatch(shopService.uploadProducts(activeCategory));
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {
        !isCatalogPage && 
        <form className="catalog-search-form form-inline">
      <input className="form-control" placeholder="Поиск"/>
    </form>
      }
    
    <ul className="catalog-categories nav justify-content-center">
    {
      categories.length > 1 && 
      categories.map((item) => {
        return (
          <li 
            className={item.id === activeCategory ? `nav-link active` : 'nav-link'} 
            key={item.id} 
            onClick={() => changeCategory(item.id)}>{item.title}
          </li>
        )
      })
    }
    </ul>
    <div className="row">
    {
      products.length > 0 &&
      products.map((item) => <ProductCard card={item} key={item.id}/>)
    }
    </div>
    <div className="text-center">
      {
        products.length >= 5 &&
      <button 
        className="btn btn-outline-primary"
        onClick={() => getLoadMoreCards()}
      >Загрузить ещё</button>
      }
      
    </div>
  </section>
  )
}