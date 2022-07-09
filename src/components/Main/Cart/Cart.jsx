import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../../cartReducer';
import OrderForm from '../../Forms/OrderForm';
import Loader from '../../Loader/Loader'

export default function CartPage () {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartMaker.cart);
  const error = useSelector((state) => state.cartMaker.error);
  const loading = useSelector((state) => state.cartMaker.loading);
  const cart_posted = useSelector((state) => state.cartMaker.cart_posted);
  const [sum, setSum] = useState()

  useEffect(() => {
    if(cart && cart.length > 0) {
     setSum(cart.reduce((sum, current) => sum + current.total_price, 0))
    }
  }, [cart])

  const removeProduct = (product) => {
    dispatch(deleteProduct(product))
  }
  return (
    <>
    <section className="cart">
            <h2 className="text-center">Корзина</h2>
            {cart_posted && <h2 className="text-center">Ваш заказ оформлен, ожидайте звонок от менеджера</h2>}
    {cart.length > 0 &&
      <>
      <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  return (
                    <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td><a href="/products/1.html">{item.title}</a></td>
                    <td>{item.size}</td>
                    <td>{item.count}</td>
                    <td>{item.price}</td>
                    <td>{item.total_price}</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm"
                      onClick={() => removeProduct(item)}
                      >Удалить</button>
                    </td>
                  </tr>
                  )
                })}
                <tr>
                  <td colSpan="5" className="text-end">Общая стоимость</td>
                  <td>{`${sum} руб.`}</td>
                </tr>
              </tbody>
            </table>
          </>
          }
          </section>
          {
            cart.length > 0 &&
            <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            {error && <p className="text-center">{error}</p>}
            {loading === 'loading' && <Loader/>}
            <div className="card">
             <OrderForm/>
            </div>
          </section>
          }
         
          </>
  )
}