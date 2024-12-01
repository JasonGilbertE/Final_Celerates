import React from "react";

const KeranjangData = ({ item, onRemove, onIncrement, onDecrement }) => {
  return (
    <div className="product-item">
      <img src={item.image} alt={item.name} />
      <div className="details">
        <h2>{item.name}</h2>
        <p>{item.color}</p>
        <div className="quantity">
          <button className="remove" onClick={onRemove}>
            <i className="fas fa-trash text-black cursor-pointer"></i>
          </button>
          <button onClick={onDecrement}>-</button>
          <input type="text" value={item.quantity} readOnly />
          <button onClick={onIncrement}>+</button>
        </div>
        <div className="price" data-price={item.price}>
          Rp. {item.price.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default KeranjangData;
