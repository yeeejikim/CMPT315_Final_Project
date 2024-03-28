import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CompOrderCardList } from "../comporderscardlist/compordercardlist.component.jsx"

const CompletedOrdersTab = () => {
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
    }, []);

    // Filter orders to show only orders that are not complete
    useEffect(() => {
        if (managerRestaurantId !== null) {
            const filtered = orders.filter(order => order.restaurant === managerRestaurantId && order.order_status === 'Order completed');
            setFilteredOrders(filtered);
        }
    }, [orders, managerRestaurantId]);

    return (
        <div>
            <h2>Completed Orders</h2>
            <CompOrderCardList orders={filteredOrders} />
        </div>
    );
}

export default CompletedOrdersTab;