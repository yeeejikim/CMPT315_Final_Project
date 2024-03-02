import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Restaurants from './pages/Restaurants.js';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Restaurants />} />
      </Routes>
    </Router>
  )

}

export default App;
