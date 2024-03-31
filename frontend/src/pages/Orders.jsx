import React, { useState, useEffect, Component } from "react"
import "./Orders.css";
import { Link } from 'react-router-dom';
import CustOrdersTab from "../components/tabs/CustomerTabs/CustOrdersTab";
import CustCompOrdersTab from "../components/tabs/CustomerTabs/CustCompOrdersTab";

const Orders = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Document click locations
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Check if the click is not on the profile menu
    const handleClickOutside = (event) => {
        const profileMenu = document.querySelector(".profile-button");
        if (profileMenu && !profileMenu.contains(event.target)) {
            setShowProfileMenu(false);
        }
    };

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
                <button className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => handleTabChange('orders')}>Orders-In-Progress</button>
                <button className={`tab-button ${activeTab === 'completedOrders' ? 'active' : ''}`} onClick={() => handleTabChange('completedOrders')}>Completed Orders</button>
            </div>
            <div className="tab-content">
                {activeTab === 'orders' && <CustOrdersTab />}
                {activeTab === 'completedOrders' && <CustCompOrdersTab />}
            </div>
            </main>
    );
}

export default Orders