import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Restaurants from './pages/Restaurants.js';
import Manager from './pages/Manager.jsx';
import Menu from './pages/Menus.jsx';
import Header from './header-component/Header.jsx';
import Cart from './components/Cart/Cart.jsx';
import CartItem from './components/Cart/CartItem.jsx';
import ManagerSelector from './pages/ManagerSelector.jsx';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Function for adding items to cart (replace with your logic)
  const handleAddToCart = (item) => {
    const existingCart = [...cartItems];
    const existingItemIndex = existingCart.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }
    setCartItems(existingCart);
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Restaurants onAddTocart = {handleAddToCart} />} />
          <Route path="/menu/:restaurantId" element={<Menu onAddTocart = {handleAddToCart} />} />
          //<Route path="/manager" element={<ManagerSelector />} />
          <Route path="/manager/:managerId" element={<Manager />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
