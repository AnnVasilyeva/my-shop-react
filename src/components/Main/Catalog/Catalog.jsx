import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch } from 'react-redux';
import ShopService from '../../../service';
import Loader from '../../Loader/Loader';
import './catalog.css';

const shopService = new ShopService(); 

export default function Catalog ({isCatalogPage = true}) {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.shopSlice.categories);
  const products = useSelector((state) => state.shopSlice.products);
  const searchValue = useSelector((state) => state.shopSlice.search_value);
  const loading = useSelector((state) => state.shopSlice.loading);

  const [activeCategory, setActiveCategory] = useState(11);
  const [catalogSearch, setCatalogSearch] = useState()

  useEffect(() => {
    setCatalogSearch(searchValue)
  }, [searchValue])
  
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if(catalogSearch) {
     dispatch(shopService.searchProducts(catalogSearch));
    }
  }
 

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {loading === 'loading' &&
      <Loader/>
      }
      {
        !isCatalogPage && 
        <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
          <input
            type='text' 
            name="searchValue"
            className="form-control"     placeholder="Поиск"
            value={catalogSearch ?? ''}
            onChange={(event) => setCatalogSearch(event.target.value)}
          />
    </form>
      }
    
    <ul className="catalog-categories nav justify-content-center">
    {
      categories.length > 1 && 
      categories.map((item, index) => {
        return (
          <li 
            className={item.id === activeCategory ? `nav-link active` : 'nav-link'} key={index}
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
      {loading === 'loading' &&
      <Loader/>
      }
      {
        products.length >= 5 &&
      <button 
        className={`btn btn-outline-primary ${loading === 'loading' && 'btn-secondary'}`}
        disabled={loading === 'loading'}
        onClick={() => getLoadMoreCards()}
      >Загрузить ещё</button>
      }
      
    </div>
  </section>
  )
}