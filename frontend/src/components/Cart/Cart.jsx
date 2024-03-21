import React, { useState } from 'react';
import CartItem from './CartItem';
import Header from '../../header-component/Header';

const Cart = ({ cartItems, onUpdateCart }) => {
  const [updatedCart, setUpdatedCart] = useState(cartItems); // Maintain local state for cart

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = [...updatedCart]; // Copy the cart items array
    const index = updatedItems.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      updatedItems[index].quantity = newQuantity;
      setUpdatedCart(updatedItems);
      onUpdateCart(updatedItems); // Call parent function to update global state (optional)
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = updatedCart.filter((item) => item.id !== itemId);
    setUpdatedCart(updatedItems);
    onUpdateCart(updatedItems); // Call parent function to update global state (optional)
  };

  return (
    <><Header></Header><div className="cart-container">
          <h2>Your Cart</h2>
          {updatedCart.length === 0 ? (
              <p>Your cart is empty.</p>
          ) : (
              <ul>
                  {updatedCart.map((item) => (
                      <CartItem
                          key={item.id}
                          item={item}
                          onQuantityChange={handleQuantityChange}
                          onRemoveItem={handleRemoveItem} />
                  ))}
              </ul>
          )}
          {/* Cart total (logic updated to reflect quantity changes) */}
          {updatedCart.length > 0 && (
              <div className="cart-total">
                  <p>
                      Total: $
                      {updatedCart.reduce((total, item) => total + item.price * item.quantity, 0)}
                  </p>
              </div>
          )}
      </div></>
  );
};

export default Cart;
