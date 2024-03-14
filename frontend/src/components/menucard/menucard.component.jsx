import React from "react";
import './menucard.styles.css'

export const Card = ({ item }) => {
    const { item_id, item_name, item_price } = item;
    // Change src later
    return (
        <div className='card-container'>
            <img alt='menu' src={`https://robohash.org/${item_id}?set=set2&size =15x15`}></img>
            <h2>{item_name}</h2>
        </div>
    )
};