export default function ProductCard ({card}) {
  const first_img = card.images[0];

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
        <button type='button' className="btn btn-outline-primary">Заказать</button>
      </div>
    </div>
    </div>
  )
}