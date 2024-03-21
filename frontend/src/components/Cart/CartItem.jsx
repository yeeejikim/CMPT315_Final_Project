import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <li key={item.id}>
      <div className="cart-item">
        <img src={item.image} alt={item.name} width="100" />
        <div className="item-details">
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <div className="quantity-control">
            <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
            <input type="number" min="1" value={item.quantity} onChange={handleQuantityChange} />
            <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
          </div>
          <button onClick={() => onRemoveItem(item.id)}>Remove</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
