import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Restaurants from './pages/Restaurants.js';
import Manager from './pages/Manager.jsx';
import Menu from './pages/Menus.jsx';
import Header from './header-component/Header.jsx';

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
          <Route path="/manager" element={<Manager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
