import React from "react";
import './restcard.styles.css'
export const Card = ({ restaurant }) => {
    const { id, name } = restaurant;
    return (
        <div className='card-container'>
            <img alt='restaurant' src={`https://robohash.org/${id}?set=set2&size =15x15`}></img>
            <h2>{name}</h2>
        </div>
    )
};