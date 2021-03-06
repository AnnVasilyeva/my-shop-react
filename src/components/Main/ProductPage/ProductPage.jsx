import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import Loader from '../../Loader/Loader';
import { addToCart } from '../../../cartReducer';

export default function ProductPage () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.shopSlice.selected_product);
  const loading = useSelector((state) => state.shopSlice.loading);
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);
  const [isAvalible, setIsAvailable] = useState(false)
  
  useEffect(() => {
    if(loading === 'idle' && product) {
      const avalible = product.sizes.find(item => item.avalible === true);
      if(avalible !== undefined) {
        setIsAvailable(true)
      }
    }
  }, [product, loading])


  const selectSize = (i) => {
    i === selectedSize ? setSelectedSize(null) :
    setSelectedSize(i)
  }

  const inc = () => {
    if(count === 10) return
    setCount(count + 1)
  }

  const dec = () => {
    if(count === 1) return
    setCount(count - 1)
  }

  const redirectToCart = () => {
    const item = {
      id: product.id,
      title: product.title,
      size: product.sizes[selectedSize].size,
      price: product.price,
      total_price: product.price * count,
      count: count
    }
    dispatch(addToCart(item)); 
    navigate('/cart')
  }

  return(
    <section className="catalog-item">
    {loading === 'loading' &&
      <Loader/>
    }
    {product && loading === 'idle' &&
      <>
     <h2 className="text-center">{product.title}</h2>
      <div className="row">
        <div className="col-5">
            <img src={product.images[0]}
                className="img-fluid" alt=""/>
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                  <td>Артикул</td>
                  <td>{product.sku || ''}</td>
              </tr>
              <tr>
                  <td>Производитель</td>
                  <td>{product.manufacturer || ''}</td>
              </tr>
              <tr>
                  <td>Цвет</td>
                  <td>{product.color || ''}</td>
              </tr>
              <tr>
                  <td>Материалы</td>
                  <td>{product.material || ''}</td>
              </tr>
              <tr>
                  <td>Сезон</td>
                  <td>{product.season || ''}</td>
              </tr>
              <tr>
                  <td>Повод</td>
                  <td>{product.reason || ''}</td>
              </tr>
            </tbody>
            </table>
            <div className="text-center">
                <p>Размеры в наличии: 
                  {product.sizes.map((item, index) => {
                    if(item.avalible) {
                      return (
                        <button type='button' key={index} onClick={() => selectSize(index)} className={`catalog-item-size ${selectedSize === index && 'selected'}`}>{item.size}</button>
                      )
                    }
                    return null
                  }
                   
                  )}
                 </p>
                 {isAvalible &&
                 <p>Количество: <span className="btn-group btn-group-sm pl-2">
                 <button 
                 className="btn btn-secondary"
                 onClick={() => dec()}
                 >-</button>
                 <span className="btn btn-outline-primary">{count}</span>
                 <button 
                 className="btn btn-secondary"
                 onClick={() => inc()}
                 >+</button>
                 </span>
                 </p>
                 }
            </div>
            {isAvalible &&
            <div className="d-grid gap-2">
             <button className={`btn btn-block btn-lg ${selectedSize != null ? 'btn-danger' : 'btn-secondary'}`}
             disabled={selectedSize === null}
             onClick={() => redirectToCart()}
             >В корзину</button>
             </div> 
            }
             
          </div>
      </div>
    </>
    }
    </section>
  )
}