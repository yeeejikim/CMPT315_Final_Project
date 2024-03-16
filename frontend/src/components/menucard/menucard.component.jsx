import React from "react";
import './menucard.styles.css'
import { useState, useEffect, Component } from "react"

export const Card = ({ item }) => {
    const { item_id, item_name, item_price } = item;
    const [quantity, setQuantity] = useState(1); // State to track quantity

    const handleQuantityChange = (event) => {
        // Ensure only positive integers are allowed
        const newQuantity = parseInt(event.target.value.replace(/\D/, '')) || 1;
        setQuantity(newQuantity);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const addToCart = () => {
        // Implement your add to cart functionality here
        console.log(`Added ${quantity} ${item_name}(s) to cart`);
    };

    // Change src later
    return (
        <div className='menu-card-container'>
            <h2>{item_name}</h2>
            <img alt='menu' src={`https://robohash.org/${item_id}?set=set2&size =15x15`}></img>
            <div className="quantity-controls">
                <button onClick={decreaseQuantity}>-</button>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
                <button onClick={increaseQuantity}>+</button>
            </div>
            <button className="cartbutton" onClick={addToCart}>Add to Cart</button>
        </div>
    )
};