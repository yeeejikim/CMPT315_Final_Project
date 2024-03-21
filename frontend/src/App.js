import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Restaurants from './pages/Restaurants.js';
import Manager from './pages/Manager.jsx';
import Menu from './pages/Menus.jsx';
import Header from './header-component/Header.jsx';
import Cart from './components/Cart/Cart.jsx';
import CartItem from './components/Cart/CartItem.jsx';

function App() {
  const [cartItems, setCartItems] = useState([]); // State for cart items

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []); // Empty dependency array to run only once on mount

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Restaurants />} />
          <Route path="/menu/:restaurantId" element={<Menu />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
