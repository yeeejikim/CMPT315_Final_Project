import React, { useState, useEffect, Component } from "react"
import axios from 'axios';
import "./Restaurants.css";
import { CardList } from "../components/cardlist/restcardlist.component";
import { SearchBar } from '../searchbar/searchbar.component';
import { Link } from 'react-router-dom';
import logo from '../header-component/logo.png';
import list from '../header-component/left-chevron.png';

const Restaurants = ({}) => {

    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Get the restaurants and handle click locations
    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await axios.get("/restaurants");
            setRestaurants(response.data);
            setFilteredRestaurants(response.data); // Set initial filtered list
        };
        fetchRestaurants();

    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);
    
      const handleClickOutside = (event) => {
        const profileMenu = document.querySelector(".profile-button");
        if (profileMenu && !profileMenu.contains(event.target)) {
          setShowProfileMenu(false);
        }
      };
    
      const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
      };

    // Check the values of the search bar and search for restaurants
    const handleInput = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = restaurants.filter(restaurant =>
            restaurant && restaurant.rest_name && restaurant.rest_name.toLowerCase().includes(searchTerm)
        );
        setFilteredRestaurants(filtered);
    };

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
            <h1 className="restaurantslist">Restaurants</h1>
            <CardList restaurants={filteredRestaurants} />
        </main>
    );
}

export default Restaurants