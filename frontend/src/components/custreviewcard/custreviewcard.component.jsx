import React from "react";
import './custreviewcard.styles.css'
import { useEffect, useState } from "react";

// Create order cards
export const CustReviewCard = ({ order }) => {
    const { order_id, order_time, order_status, order_instruction, order_pickup, customer, has_review } = order;

    const [showReviewButton, setShowReviewButton] = useState(true);

    useEffect(() => {
        if (has_review) {
            setShowReviewButton(false);
        }
    }, [has_review]);

    const handleReviewClick = () => {
        // Fill this review form and submit a review through a POST
        console.log('Review button clicked');
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