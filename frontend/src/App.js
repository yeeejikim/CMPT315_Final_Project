import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Restaurants from './pages/Restaurants.js';
import Menu from './pages/Menus.jsx';
import Header from './header-component/Header.jsx';

///menu/:restaurantId need this after get works
function App() {

  const handleInput = e => {
    console.log(e.target.value)
    };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Restaurants />} />
          <Route path="/menu/:restaurantId" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
