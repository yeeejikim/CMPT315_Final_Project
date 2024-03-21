
import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import { MenuCardList } from '../components/menucardlist/menucardlist.component';
import { SearchBar } from '../searchbar/searchbar.component';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, onRemoveItem }) => {
  return (
    <div className="cart-container">
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
                  {/* Optional: Quantity and remove button */}
                  <div className="quantity-control">
                    <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Optional: Cart total */}
      {cartItems.length > 0 && (
        <div className="cart-total">
          <p>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;