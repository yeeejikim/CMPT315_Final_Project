import React, { useState, useEffect, Component } from "react"
import axios from 'axios';
import { ManagerCardList } from "../components/managercardlist/managercardlist.component";
import { Link } from 'react-router-dom';
import logo from '../header-component/logo.png'

const ManagerSelector = ({ }) => {

    const [manager, setManagers] = useState([]);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Get all managers and handle click locations
    useEffect(() => {
        const fetchManagers = async () => {
            const response = await axios.get("/managers");
            setManagers(response.data);
        };
        fetchManagers();

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

    return (
        <main className="content">
            <header className="header">
                <div className="header-container">
                    {/* <div className="logo"> */}
                        <Link to="/" className="logotext">Back to User Selection</Link>
                    {/* </div> */}
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
            <h1 className="restaurantslist">Managers</h1>
            <ManagerCardList managers={manager} />
        </main>
    );
}

export default ManagerSelector