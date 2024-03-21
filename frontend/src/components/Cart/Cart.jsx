import React from 'react';
import CartItem from './CartItem';
import Header from '../../header-component/Header';

const Cart = ({ cartItems }) => {
  return (
    <><Header></Header><div className="cart-container">
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
          ) : (
              <ul>
                  {cartItems.map((item) => (
                      <li key={item.id}>
                          <div className="cart-item">
                              <img src={item.image} alt={item.name} width="100" />
                              <div className="item-details">
                                  <h3>{item.name}</h3>
                                  <p>Price: ${item.price}</p>
                                  {/*Quantity control */}
                                  <div className="quantity-control">
                                      <button>-</button>
                                      <span>{item.quantity}</span>
                                      <button>+</button>
                                  </div>
                              </div>
                          </div>
                      </li>
                  ))}
              </ul>
          )}
          {/* Cart total */}
          {cartItems.length > 0 && (
              <div className="cart-total">
                  <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
              </div>
          )}
      </div></>
  );
};

export default Cart;
