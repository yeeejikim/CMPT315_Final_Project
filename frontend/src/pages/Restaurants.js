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

    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await axios.get("/restaurant");
            setRestaurants(response.data);
            setFilteredRestaurants(response.data); // Set initial filtered list
        };
        fetchRestaurants();
    }, []);

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
                        <Link className='logotext' to="/">Logo</Link>
                    </div>
                    <SearchBar
                        placeholder='Search Restaurant'
                        handleInput={handleInput}
                    />
                    <div className="user-options">
                        <Link className='profile-pic' to="/">Profile</Link>
                    </div>
                </div>
            </header>
            <h1 className="restaurantslist">Restaurants</h1>
            <CardList restaurants={filteredRestaurants} />
        </main>
    );
}

export default Restaurants