import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import "./Manager.css";
import { OrderCardList } from "../components/ordercardlist/ordercardlist.component";
import { Link } from 'react-router-dom';
import OrdersTab from "../components/tabs/OrdersTab";
import CompletedOrdersTab from "../components/tabs/CompletedOrdersTab";
import StatisticsTab from "../components/tabs/StatisticsTab";

const Manager = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [managerRestaurantId, setManagerRestaurantId] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
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

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (managerRestaurantId !== null) {
            const filtered = orders.filter(order => order.restaurant === managerRestaurantId);
            setFilteredOrders(filtered);
        }
    }, [orders, managerRestaurantId]);


    const handleClickOutside = (event) => {
        const profileMenu = document.querySelector(".profile-button");
        if (profileMenu && !profileMenu.contains(event.target)) {
            setShowProfileMenu(false);
        }
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <main className="content">
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <Link className='logotext' to="/">Logo</Link>
                    </div>
                    <div className="user-options">
                        <button className='profile-button' onClick={toggleProfileMenu}>Profile</button>
                        <div className={`profile-menu ${showProfileMenu ? 'show' : ''}`}>
                            <div className="profile-links">
                                <Link to="/manager">Manager</Link>
                                <Link to="/profile">Profile</Link>
                                <Link to="/cart">Cart</Link>
                                <Link to="/orders">Orders</Link>
                                <Link to="/settings">Settings</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="tabs">
                <button onClick={() => handleTabChange('orders')}>Orders</button>
                <button onClick={() => handleTabChange('completedOrders')}>Completed Orders</button>
                <button onClick={() => handleTabChange('statistics')}>Statistics</button>
            </div>
            <div className="tab-content">
                {activeTab === 'orders' && <OrdersTab orders={filteredOrders} />}
                {activeTab === 'completedOrders' && <CompletedOrdersTab />}
                {activeTab === 'statistics' && <StatisticsTab />}
            </div>
            </main>
    );
}

export default Manager