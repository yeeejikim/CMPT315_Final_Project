import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Menus.css";
import { MenuCardList } from '../components/menucardlist/menucardlist.component';
import { SearchBar } from '../searchbar/searchbar.component';
import { Link } from 'react-router-dom';

function Menu() {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(menuItems);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Get the restaurants menu items and handle click locations
    useEffect(() => {
        const fetchMenus = async () => {
            const response = await axios.get(`/restaurants`);
            const menuItemsData = response.data[restaurantId - 1].menu_restaurant;
            setMenuItems(menuItemsData);
            setFilteredItems(menuItemsData);
        };
        fetchMenus();

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

    // Check the values of the search bar and search in menu items
    const handleInput = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = menuItems.filter(menu =>
            menu && menu.item_name && menu.item_name.toLowerCase().includes(searchTerm)
        );
        setFilteredItems(filtered);
    };

    // Show profile menu
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
                    <SearchBar
                        placeholder='Search Menu'
                        handleInput={handleInput}
                    />
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
            <h1 className="menuslist">Menu</h1>
            <MenuCardList menuItems={filteredItems} />
        </main>
    );
}

export default Menu;