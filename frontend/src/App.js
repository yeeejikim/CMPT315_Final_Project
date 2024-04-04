import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Restaurants from './pages/Restaurants.jsx';
import Manager from './pages/Manager.jsx';
import Menu from './pages/Menus.jsx';
import Header from './header-component/Header.jsx';
import Cart from './pages/Cart.jsx';
import ManagerSelector from './pages/ManagerSelector.jsx';
import Orders from './pages/Orders.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';

import Profile from './pages/Profile.jsx';




const App = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/menu/:restaurantId" element={<Menu />} />
          <Route path="/manager" element={<ManagerSelector />} />
          <Route path="/manager/:managerId" element={<Manager />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
