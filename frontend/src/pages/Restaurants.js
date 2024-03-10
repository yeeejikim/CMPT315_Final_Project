import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import "./Restaurants.css";
import { CardList } from "../components/cardlist/restcardlist.component";

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
            <h1 className="restaurantslist">Restaurants</h1>
            <CardList restaurants={restaurants} />
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