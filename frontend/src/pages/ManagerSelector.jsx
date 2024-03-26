import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import "./ManagerSelector.css";
import { ManagerCardList } from "../components/managercardlist/managercardlist.component";
import { Link } from 'react-router-dom';

const ManagerSelector = ({ }) => {
    const [manager, setManagers] = useState([]);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

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

    const handleClickOutside = (event) => {
        const profileMenu = document.querySelector(".profile-button");
        if (profileMenu && !profileMenu.contains(event.target)) {
            setShowProfileMenu(false);
        }
    };

    const toggleProfileMenu = () => {

        setShowProfileMenu(!showProfileMenu);
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
            <h1 className="restaurantslist">Managers</h1>
            <ManagerCardList managers={manager} />
        </main>
    );
}

export default ManagerSelector