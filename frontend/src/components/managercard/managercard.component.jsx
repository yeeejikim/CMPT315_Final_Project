import './managercard.styles.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect, Component } from "react"
import axios from 'axios';

export const ManagerCard = ({ manager }) => {
    const { manager_id, restaurant} = manager;
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    
    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await axios.get(`/restaurants/${restaurant}`);
            setRestaurants(response.data);
            setFilteredRestaurants(response.data); // Set initial filtered list
        };
        fetchRestaurants();
    }, []);

    return (
        <Link to={`/manager/${manager_id}`} className='card-link'>
            <div className='card-container'>
                <h1>Manager {manager_id}</h1>
                <h2>{restaurants.rest_name}</h2>
            </div>
        </Link>
    )
};