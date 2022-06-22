import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../../cartReducer';

export default function CartPage () {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartMaker.cart);
  console.log(cart)

  const removeProduct = (product) => {
    dispatch(deleteProduct(product))
  }
  return (
    <>
    <section className="cart">
            <h2 className="text-center">Корзина</h2>

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
                  <td>34 000 руб.</td>
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
            <div className="card">
              <form className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" id="phone" placeholder="Ваш телефон"/>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" id="address" placeholder="Адрес доставки"/>
                </div>
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="agreement"/>
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                
                 <button type="submit" className="btn btn-outline-secondary">Оформить</button>
              </form>
            </div>
          </section>
          }
         
          </>
  )
}