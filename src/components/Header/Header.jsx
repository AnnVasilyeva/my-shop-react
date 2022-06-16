import React, {useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ShopService from "../../service";
import './header.css';

const shopService = new ShopService(); 

export default function Header () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shopSlice.cart)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState()

  const changeSearch = () => {
    if(!isSearchOpen) {
      setIsSearchOpen(true);
    } else if (isSearchOpen && !searchValue) {
      setIsSearchOpen(false);
    } else {
      dispatch(shopService.searchProducts(searchValue));
      setIsSearchOpen(false);
      navigate('/catalog')
    }
  }
 
  
  const handleSubmit = (e) => {
   e.preventDefault()
   if(searchValue) {
    dispatch(shopService.searchProducts(searchValue));
    setIsSearchOpen(false);
    navigate('/catalog');
    
   } else setIsSearchOpen(false);
   
  }

  return (
    <header className="container header-container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <Link to="/" className="navbar-brand">Главная</Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                <Link to="/" className="nav-link">Главная</Link>
                </li>
                <li className="nav-item active">
                <Link to="/catalog" className="nav-link">Каталог</Link>
                </li>
                <li className="nav-item">
                <Link to="/about" className="nav-link">О магазине</Link>
                </li>
                <li className="nav-item">
                <Link to="/contacts" className="nav-link">Контакты</Link>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <button type="button" data-id="search-expander" className="header-controls-pic header-controls-search"
                  onClick={() => changeSearch()}>
                  </button>
                  
                  <button type="button" className="header-controls-pic header-controls-cart">
                    {cart && cart.length > 0 &&
                    <>
                     <div className="header-controls-cart-full">{cart.length}</div>
                    <div className="header-controls-cart-menu"></div>
                    </>
                    }
                    
                  </button>
                </div>
                {
                  isSearchOpen &&
                  
                  <form data-id="search-form"     className="header-controls-search-form form-inline" onSubmit={handleSubmit}>
                    <input
                    type='text' 
                    name="searchValue"
                    className="form-control"     placeholder="Поиск"
                    value={searchValue ?? ''}
                    onChange={(event) => setSearchValue(event.target.value)}
                    />
                  </form>
                }
                
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}