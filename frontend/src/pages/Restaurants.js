import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import "./Restaurants.css";
import { CardList } from "../components/cardlist/restcardlist.component";
import { SearchBar } from '../searchbar/searchbar.component';
import { Link } from 'react-router-dom';

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [showProfileMenu, setShowProfileMenu] = useState(false);


    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await axios.get("/restaurants");
            setRestaurants(response.data);
            setFilteredRestaurants(response.data); // Set initial filtered list
        };
        fetchRestaurants();

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        console.log('Clicked element:', event.target);
        const profileMenu = document.querySelector(".profile-button");
        if (profileMenu && !profileMenu.contains(event.target)) {
            setShowProfileMenu(false);
        }
    };

    const handleInput = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = restaurants.filter(restaurant =>
            restaurant && restaurant.rest_name && restaurant.rest_name.toLowerCase().includes(searchTerm)
        );
        setFilteredRestaurants(filtered);
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
                    <SearchBar
                        placeholder='Search Restaurant'
                        handleInput={handleInput}
                    />
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
            <h1 className="restaurantslist">Restaurants</h1>
            <CardList restaurants={filteredRestaurants} />
        </main>
    );
}

export default Restaurants