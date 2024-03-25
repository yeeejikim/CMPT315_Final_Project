import React, { useState, useEffect, Component  } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, onUpdateCart }) => {
  const [updatedCart, setUpdatedCart] = useState(cartItems); // Maintain local state for cart
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = [...updatedCart]; // Copy the cart items array
    const index = updatedItems.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      updatedItems[index].quantity = newQuantity;
      setUpdatedCart(updatedItems);
      onUpdateCart(updatedItems); // Call parent function to update global state (optional)
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedItems = updatedCart.filter((item) => item.id !== itemId);
    setUpdatedCart(updatedItems);
    onUpdateCart(updatedItems); // Call parent function to update global state (optional)
  };

  const handleClickOutside = (event) => {
    const profileMenu = document.querySelector(".profile-button");
    if (profileMenu && !profileMenu.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <main className="content">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link className='logotext' to="/">Logo</Link>
          </div>
          <div className="user-options">
            <button className='profile-button' onClick={toggleProfileMenu}>Profile</button>
            <div className={`profile-menu ${showProfileMenu ? 'show' : ''}`}>
              <div className="profile-links">
                <Link to="/manager">Manager</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/settings">Settings</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="cart-container">
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
      </div>
    </main>
  );
};

export default Cart;
