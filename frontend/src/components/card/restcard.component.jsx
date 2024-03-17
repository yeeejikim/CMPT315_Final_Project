import React from "react";
import './restcard.styles.css'
import { Link } from 'react-router-dom';
export const Card = ({ restaurant }) => {
    const { rest_id, rest_name } = restaurant;
    // Change src later
    return (
        <Link to={`/menu/${rest_id}`} className='card-link'>
            <div className='card-container'>
                <img alt='restaurant' src={`https://robohash.org/${rest_id}?set=set2&size =15x15`}></img>
                <h2>{rest_name}</h2>
            </div>
        </Link>
    )
};