import React, {useState} from "react";
import { Link } from "react-router-dom";
import ShopService from "../../service";
import './header.css';

const shopService = new ShopService(); 

export default function Header () {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState()

  const changeSearch = () => {
    if(!isSearchOpen) {
      setIsSearchOpen(true);
    } else if (!searchValue) {
      setIsSearchOpen(false);
    } else return
  }

  const handleChange = event => {
    setSearchValue(event.target.value);
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
                  {
                    (isSearchOpen && searchValue) ?
                    <Link to="/catalog">
                     <button type="button" data-id="search-expander" className="header-controls-pic header-controls-search"></button>
                    </Link> :
                    <button type="button" data-id="search-expander" className="header-controls-pic header-controls-search"
                    onClick={() => changeSearch()}>
                    </button>
                  }
                 
                  <button type="button" className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                  </button>
                </div>
                {
                  isSearchOpen &&
                  <form data-id="search-form"     className="header-controls-search-form form-inline">
                    <input
                    type='text' className="form-control"     placeholder="Поиск"
                    value={searchValue}
                    onChange={handleChange}
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