import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import ShopService from '../../service';

const shopService = new ShopService();


export default function OrderForm () {
  const cart = useSelector((state) => state.cartMaker.cart);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isAgree: false,
    }
  });
  const onSubmit = (value) => {
    const data = {
      "owner": {
        "phone": value.phone,
        "address": value.address,
      },
      "items": cart
    }
    dispatch(shopService.postCart(data))
    reset()
  };

  return (
    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
    <div className="form-group">
      <label htmlFor="phone">Телефон</label>
      <input className="form-control"
              id="phone"
              placeholder="Ваш телефон"
              {...register('phone')}/>
              {errors.phone && <p>Phone is required.</p>}
    </div>
    <div className="form-group">
      <label htmlFor="address">Адрес доставки</label>
      <input className="form-control"
              id="address"
              placeholder="Адрес доставки"
              {...register('address')}/>
              {errors.address && <p>Address is required.</p>}
    </div>
    <div className="form-group form-check">
      <Controller
        name="isAgree"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <input type="checkbox" className="form-check-input" id="agreement" {...field}/>}
      />
      
      <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
    </div>
    
     <button type="submit" 
            className="btn btn-outline-secondary"
            disabled={!watch('isAgree')}
            >Оформить</button>
  </form>
  )
}