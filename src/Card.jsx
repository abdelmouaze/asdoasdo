function Card({ image, title, description, price, badge }) {
  return (
    <div className="card">
      {badge && <div className="card-badge">{badge}</div>}
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <div className="card-price">{price}</div>
          <button className="card-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;