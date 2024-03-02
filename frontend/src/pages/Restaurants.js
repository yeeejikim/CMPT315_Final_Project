import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async() => {
            const response = await axios.get("/restaurant");
            setRestaurants(response.data);
        };
        fetchRestaurants();
    }, []);

    return(
        <main className="content">
            <h1>List of restaurants</h1>
            <body>
                {restaurants.map((restaurant) => {
                    return(
                        <h5>{restaurant.rest_name}</h5>
                        )
                })}
            </body>
        </main>
    )
}

export default Restaurants