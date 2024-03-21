import React from "react";
import './ordercard.styles.css'
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

export const OrderCard = ({ order }) => {
    const { order_id, order_time, order_status, order_instruction, order_pickup, customer } = order;

    const [status, setStatus] = useState(order_status);
    const [pickupTime, setPickupTime] = useState(order_pickup);
    const statusOptions = ["Order placed", "Order in progress", "Ready for pickup", "Order completed"];

    const adjustOrder = async () => {
        const response = axios.put("http://127.0.0.1:8000/order/1/update/", {
                "order_status":status
                // "order_pickup":pickupTime
            })
            .then((response) => {console.log(response.data)})
            .catch((error) => {console.error(error.toJSON())})
    };

    return (
        <div className='order-card-container'>
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
                    type="time"
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