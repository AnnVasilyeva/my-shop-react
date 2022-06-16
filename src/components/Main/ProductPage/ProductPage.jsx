import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

export default function ProductPage () {
  const navigate = useNavigate();

  const product = useSelector((state) => state.shopSlice.selected_product);
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);
  const [isAvalible, setIsAvailable] = useState(false)

  useEffect(() => {
    const avalible = product.sizes.find(item => item.avalible === true);
    if(avalible !== undefined) {
      setIsAvailable(true)
    }
  }, [product])


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
    navigate('/cart')
  }

  return(
    <section className="catalog-item">
    {product && 
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
             <button className={`btn btn-block btn-lg ${selectedSize != null ? 'btn-danger' : 'btn-secondary'}`}
             onClick={() => redirectToCart()}
             >В корзину</button> 
            }
             
          </div>
      </div>
    </>
    }
    </section>
  )
}