import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem.jsx';
import { Link } from 'react-router-dom';
import logo from '../header-component/logo.png';
import list from '../header-component/left-chevron.png';
import axios from 'axios';

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);
  const [updatedCart, setUpdatedCart] = useState(cartItems); // Maintain local state for cart
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const cart = JSON.parse(localStorage.getItem('cart'));
  const user = JSON.parse(localStorage.getItem('user'));
  const finalCart = cartItems.map(item => item.item_id);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
      // setRestaurant(cartItems[0].restaurant);
    }
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = [...updatedCart]; // Copy the cart items array
    const index = updatedItems.findIndex((item) => item.item_id === itemId);
    if (index !== -1) {
      updatedItems[index].quantity = newQuantity;
      setUpdatedCart(updatedItems);
      // onUpdateCart(updatedItems); // Call parent function to update global state (optional)
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedItems = updatedCart.filter((item) => item.item_id !== itemId);
    setUpdatedCart(updatedItems);
    // onUpdateCart(updatedItems); // Call parent function to update global state (optional)
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

  const EmptyCart = (e) => {
    e.preventDefault();
    localStorage.removeItem('cart')
  }

  const SubmitOrder = (e) => {
    e.preventDefault();
    try {
        const response = axios.post("/orders/", {
          "order_time":"2024-03-18T21:56:00",
          "order_status":"Order placed",
          "order_instruction":"",
          "order_pickup":"2024-03-19T01:57:00",
          "customer": user.cust_id,
          "restaurant": cart[0].restaurant,
          "menuItems": finalCart,
          "has_review": false
      });
      EmptyCart(e);
    } catch (error) {
        alert("Error in processing order.")
    }
  }

  return (
    <main className="content">
      <header className="header">
          <div className="header-container">
              <div className="logo">
                  <Link className="logoimage" to="/restaurants">
                      <img src={logo} width={70}/>
                  </Link>
              </div>
              <div className="user-options">
                  <img src = {list} className='profile-button' width = {50} onClick={toggleProfileMenu} />
                  <div className={`profile-menu ${showProfileMenu ? 'show' : ''}`}>
                      <div className="profile-links">
                          {/* <Link to="/manager">Manager</Link> */}
                          <Link to="/profile">Profile</Link>
                          <Link to="/cart">Cart</Link>
                          <Link to="/orders">Orders</Link>
                          <Link to="/logout">Logout</Link>
                      </div>
                  </div>
              </div>
          </div>
      </header>
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <p>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem} />
            ))}
          </p>
        )}
        {/* Cart total (logic updated to reflect quantity changes) */}
        {cartItems.length > 0 && (
          <div className="cart-total">
            <p>
              Total: $
              {cartItems.reduce((total, item) => total + item.item_price * item.quantity, 0)}
            </p>
          </div>
        )}
        <p><button type="submit" onClick={SubmitOrder}>Order</button></p>
        <p><button type="submit" onClick={EmptyCart}>Empty Cart</button></p>

      </div>
    </main>
  );
};

export default Cart;