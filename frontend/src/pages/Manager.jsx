import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import "./Manager.css";
import { OrderCardList } from "../components/ordercardlist/ordercardlist.component";
import { Link } from 'react-router-dom';

const Manager = () => {
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
        console.log('Clicked element:', event.target);
        const profileMenu = document.querySelector(".profile-button");
        if (profileMenu && !profileMenu.contains(event.target)) {
            setShowProfileMenu(false);
            console.log('Profile menu closed');
        }
    };

    const toggleProfileMenu = () => {
        console.log('Before toggle:', showProfileMenu);
        setShowProfileMenu(!showProfileMenu);
        console.log('After toggle:', showProfileMenu);
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
                                <Link to="/orders">Orders</Link>
                                <Link to="/settings">Settings</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <h1 className="restaurantslist">Orders</h1>
            <OrderCardList orders={filteredOrders} />
        </main>
    );
}

export default Manager