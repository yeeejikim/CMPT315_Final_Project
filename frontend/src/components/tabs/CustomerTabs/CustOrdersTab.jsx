import React, { useState, useEffect } from "react";
import axios from 'axios';
import { CompOrderCardList } from "../../comporderscardlist/compordercardlist.component.jsx";

const CustOrdersTab = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [customers, setCustomers] = useState([]); // State to store customer data
    const [selectedCustomerId, setSelectedCustomerId] = useState(1); // Default customer ID to 1

    // Fetch customers from the backend
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("/customers");
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    // Function to handle changing the selected customer ID
    const handleCustomerChange = (event) => {
        setSelectedCustomerId(parseInt(event.target.value));
    };

    // Get the orders from that customer
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get("/orders");
            setOrders(response.data);
        };
        fetchOrders();
    }, []);

    // Filter orders to show only orders that are not complete
    useEffect(() => {
        if (selectedCustomerId !== null) {
            const filtered = orders.filter(order => order.customer === selectedCustomerId && order.order_status !== 'Order completed');
            setFilteredOrders(filtered);
        }
    }, [orders, selectedCustomerId]);

    return (
        <div>
            <h2>Orders-In-Progress</h2>
            <div className="dropdown-container">
                <select value={selectedCustomerId} onChange={handleCustomerChange} className="dropdown">
                    {customers.map(customer => (
                        <option key={customer.cust_id} value={customer.cust_id}>
                            {customer.cust_name} - ID: {customer.cust_id}
                        </option>
                    ))}
                </select>
            </div>
            <CompOrderCardList orders={filteredOrders} />
        </div>
    );
}

export default CustOrdersTab;
