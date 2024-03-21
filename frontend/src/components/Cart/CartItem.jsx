import React from 'react';

const CartItem = ({ item, onRemoveItem }) => {
  return (
    <li key={item.id}>
      <div className="cart-item">
        <img src={item.image} alt={item.name} width="100" />
        <div className="item-details">
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          {/* Optional: Quantity control and remove button */}
          <div className="quantity-control">
            <button>-</button>
            <span>{item.quantity}</span>
            <button>+</button>
          </div>
          <button onClick={() => onRemoveItem(item.id)}>Remove</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
