import React, {useEffect} from 'react';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useDispatch } from 'react-redux';
import ShopService from './service';
import './App.css';

const shopService = new ShopService(); 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shopService.fetchCategories());
    dispatch(shopService.fetchProducts());
    dispatch(shopService.fetchTopSales());
  }, [dispatch])

  return (
    <div className="App">
     <Header/>
     <Main/>
      <Footer/>
    </div>
  );
}

export default App;
