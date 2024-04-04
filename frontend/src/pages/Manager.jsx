import React, { useState, useEffect } from "react"
import "./Manager.css";
import { Link } from 'react-router-dom';
import OrdersTab from "../components/tabs/OrdersTab";
import CompletedOrdersTab from "../components/tabs/CompletedOrdersTab";
import StatisticsTab from "../components/tabs/StatisticsTab";
import MenuItemsTab from "../components/tabs/MenuItemsTab";
import ReviewsTab from "../components/tabs/ReviewsTab";
import logo from '../header-component/logo.png';

const Manager = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Show profile menu
    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    // Tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <main className="content">
            <header className="header">
                <div className="header-container">
                        <Link to="/manager" className="logotext">All Managers</Link>
                    {/* <div className="user-options">
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
                    </div> */}
                </div>
            </header>
            <div className="tabs">
                <button className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => handleTabChange('orders')}>Orders</button>
                <button className={`tab-button ${activeTab === 'completedOrders' ? 'active' : ''}`} onClick={() => handleTabChange('completedOrders')}>Completed Orders</button>
                <button className={`tab-button ${activeTab === 'menuItems' ? 'active' : ''}`} onClick={() => handleTabChange('menuItems')}>Menu Items</button>
                <button className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => handleTabChange('reviews')}>Reviews</button>
                <button className={`tab-button ${activeTab === 'statistics' ? 'active' : ''}`} onClick={() => handleTabChange('statistics')}>Statistics</button>
            </div>
            <div className="tab-content">
                {activeTab === 'orders' && <OrdersTab />}
                {activeTab === 'completedOrders' && <CompletedOrdersTab />}
                {activeTab === 'menuItems' && <MenuItemsTab/>}
                {activeTab === 'reviews' && <ReviewsTab/>}
                {activeTab === 'statistics' && <StatisticsTab />}
            </div>
            </main>
    );
}

export default Manager