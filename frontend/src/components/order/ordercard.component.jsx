import React from "react";
import './ordercard.styles.css'
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

// Create order cards
export const OrderCard = ({ order, fetchUpdatedOrders }) => {
    const { order_id, order_time, order_status, order_instruction, order_pickup, customer } = order;

    const [status, setStatus] = useState(order_status);
    const [pickupTime, setPickupTime] = useState(order_pickup);
    const statusOptions = ["Order placed", "Order in progress", "Ready for pickup", "Order completed"];

    // Used to get information about the order i.e. order status and order pickup time
    const adjustOrder = async () => {
        if (status === "Order completed") {
            const confirmed = window.confirm("Are you sure you want to mark this order as completed?");
            if (!confirmed) {
                return; // If not confirmed, do nothing
            }
        }

        try {
            await axios.put(`http://127.0.0.1:8000/order/${order_id}/update/`, {
                "order_status": status,
                "order_pickup": pickupTime
            });
            fetchUpdatedOrders();
        } catch (error) {
            console.error("Error updating order:", error)
        }
    };

    return (
        <div className='orders-card-container'>
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
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {statusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div>
                <h>Order Instructions: </h>
                <span>{order_instruction}</span>
            </div>
            <div>
                <h>Order Pickup Time: </h>
                <input
                    type="datetime-local"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                />
            </div>
            <div>
                <h>Order Customer: </h>
                <span>{customer}</span>
            </div>
            <div className='order-card-buttons'>
                <button className='adjust-button' onClick={adjustOrder}>Adjust</button>
                <button className='complete-button'>Complete</button>
            </div>
        </div>
    )
};