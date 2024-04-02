import React from "react";
import './comporder.styles.css'

// Create order cards
export const CompOrderCard = ({ order }) => {
    const { order_id, order_time, order_status, order_instruction, order_pickup, customer } = order;

    return (
        <div className='comp-order-card-container'>
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
        </div>
    )
};