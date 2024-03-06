import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Restaurants from './pages/Restaurants.js';
import Header from './header-component/Header.jsx';

function App() {

  const handleInput = e => {
    console.log(e.target.value)
    };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Restaurants />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
