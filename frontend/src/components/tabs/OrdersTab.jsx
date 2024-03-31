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
    const managerId = useParams();

    // Get the manager id and restaurant id
    useEffect(() => {
        const fetchManagerData = async () => {
            const managerResponse = await axios.get(`/managers/${parseInt(managerId['managerId'])}`);
            const managerData = managerResponse.data;
            setManagerRestaurantId(managerData.restaurant);
        };
        fetchManagerData();
    }, [managerId]);

    // Get the orders from that restaurant
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get("/orders");
            setOrders(response.data);
        };
        fetchOrders();
        // Set up interval to fetch orders every 1 seconds
        //const interval = setInterval(fetchOrders, 1000);

        // Clean up interval on component unmount
        //return () => clearInterval(interval);
    }, []);

    // Filter orders to show only orders that are not complete
    useEffect(() => {
        if (managerRestaurantId !== null) {
            const filtered = orders.filter(order => order.restaurant === managerRestaurantId && order.order_status !== 'Order completed');
            setFilteredOrders(filtered);
        }
    }, [orders, managerRestaurantId]);

    // Function to fetch orders again after adjustment
    const fetchUpdatedOrders = async () => {
        try {
            const response = await axios.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching updated orders:', error);
        }
    };

    return (
        <div>
            <h2>Orders</h2>
            <OrderCardList orders={filteredOrders} fetchUpdatedOrders={fetchUpdatedOrders} />
        </div>
    );
}

export default OrdersTab;