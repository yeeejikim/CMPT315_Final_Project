import React from "react";
import './manageritemscard.styles.css'
import { useState, useEffect, Component } from "react"

// Create menu item cards
export const ManagerItemCard = ({ item }) => {
    const { item_id, item_name, item_price, item_image, item_availability} = item;

    return (
        <div className='menu-card-container'>
            <h2>{item_name}</h2>
            <img alt='menu' src={item_image} width={100}></img>
            <h3>$ {item_price}</h3>
            <h5>Availability: {item_availability}</h5>
            <h5>Click to Edit</h5>
        </div>
    )
};