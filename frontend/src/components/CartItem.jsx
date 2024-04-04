import React from 'react';

const CartItem = ({ item }) => {
  // const onRemoveItem = (id) => {
  //   localStorage.removeItem(item.id);
  // }

  return (
    <p key={item.id}>
      <div className="cart-item">
        <img src={item.item_image} alt={item.name} width="100" />
        <div className="item-details">
          <h3>{item.item_name}</h3>
          <p>Price: ${item.item_price}</p>
          {/* <button onClick={() => onRemoveItem(item.id)}>Remove</button> */}
        </div>
      </div>
    </p>
  );
};

export default CartItem;
