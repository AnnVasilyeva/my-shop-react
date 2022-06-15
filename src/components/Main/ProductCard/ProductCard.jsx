import React from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import ShopService from "../../../service";

const shopService = new ShopService();

export default function ProductCard ({card}) {
  const dispatch = useDispatch();
  const first_img = card.images[0];
  const pathName = `/catalog/${card.id}`;

  const navigate = useNavigate();

  const redirectPage = () => {
    dispatch(shopService.selectProduct(card.id));
    navigate(pathName);
  }

  return (
    <div className="col-4">
    <div className="card catalog-item-card">
      <div className="card-img">
        <img src={first_img}
        className="card-img-top img-fluid" alt={card.title}/>
      </div>
      <div className="card-body">
        <p className="card-text">{card.title}</p>
        <p className="card-text">{`${card.price} руб.`}</p>
        <button type='button' className="btn btn-outline-primary" onClick={() => redirectPage()}>Заказать</button>
      </div>
    </div>
    </div>
  )
}