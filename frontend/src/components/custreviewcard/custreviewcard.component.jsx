import React from "react";
import './custreviewcard.styles.css'
import { useEffect, useState } from "react";
import axios from "axios";

// Create order cards
export const CustReviewCard = ({ order }) => {
    const { order_id, order_time, order_status, order_instruction, order_pickup, customer, has_review } = order;

    const [showReviewButton, setShowReviewButton] = useState(true);

    const [review, setReview] = useState({
        "review_text": "good",
        "rating": true,
        "customer": 1,
        "restaurant": 1
    });

    useEffect(() => {
        if (has_review) {
            setShowReviewButton(false);
        }
    }, [has_review]);

    const handleReviewClick = async () => {
        try {
            const response = await axios.post("/reviews/", { ...review });
            has_review = true;
        } catch (error) {
            console.error('Error creating new menu item:', error);
        }
    };

    return (
        <div className='cust-review-card-container'>
            <div>
                <h>Order Number: </h>
                <span>{order_id}</span>
            </div>
            <div>
                <h>Order Time: </h>
                <span>{order_time}</span>
            </div>
            <div>
                <h>Order Status: </h>
                <span>{order_status}</span>
            </div>
            <div>
                <h>Order Instructions: </h>
                <span>{order_instruction}</span>
            </div>
            <div>
                <h>Order Pickup Time: </h>
                <span>{order_pickup}</span>
            </div>
            <div>
                <h>Order Customer: </h>
                <span>{customer}</span>
            </div>
            {showReviewButton && <button className="review-button" onClick={handleReviewClick}>Review</button>}
        </div>
    )
};