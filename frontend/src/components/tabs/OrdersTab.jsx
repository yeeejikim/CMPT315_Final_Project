import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import { OrderCardList } from "../ordercardlist/ordercardlist.component";
import { Link } from 'react-router-dom';

const OrdersTab = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [managerRestaurantId, setManagerRestaurantId] = useState(null);
    const managerId = 1; // Fetch later

    useEffect(() => {
        const fetchManagerData = async () => {
            const managerResponse = await axios.get(`/managers/${managerId}`);
            const managerData = managerResponse.data;
            setManagerRestaurantId(managerData.restaurant);
        };
        fetchManagerData();
    }, [managerId]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get("/orders");
            setOrders(response.data);
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        if (managerRestaurantId !== null) {
            const filtered = orders.filter(order => order.restaurant === managerRestaurantId);
            setFilteredOrders(filtered);
        }
    }, [orders, managerRestaurantId]);

    return (
        <div>
            <h2>Orders</h2>
            <OrderCardList orders={filteredOrders} />
        </div>
    );
}

export default OrdersTab;