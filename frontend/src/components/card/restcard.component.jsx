import React from "react";
import './restcard.styles.css'
import { Link } from 'react-router-dom';
export const Card = ({ restaurant }) => {
    const { rest_id, rest_name, rest_image } = restaurant;
    
    return (
        <Link to={`/menu/${rest_id}`} className='card-link'>
            <div className='card-container'>
                <img alt='restaurant' src={rest_image} width={100} height={100}></img>
                <h2>{rest_name}</h2>
            </div>
        </Link>
    )
};