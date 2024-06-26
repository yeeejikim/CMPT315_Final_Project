import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Menus.css";
import { MenuCardList } from '../components/menucardlist/menucardlist.component';
import { SearchBar } from '../searchbar/searchbar.component';
import { Link } from 'react-router-dom';
import logo from '../header-component/logo.png'
import list from '../header-component/left-chevron.png'
import MenuTab from "../components/tabs/MenuTab";
import CartTab from "../components/tabs/CartTab";

function Menu() {

    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(menuItems);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [activeTab, setActiveTab] = useState('menu');

    // Get the restaurants menu items and handle click locations
    useEffect(() => {
        const fetchMenus = async () => {
            const response = await axios.get(`/restaurants`);
            const menuItemsData = response.data[restaurantId - 1].menu_restaurant;

            // Filters the item so that if out of stock doesn't show
            const filteredMenuItems = menuItemsData.filter(item => item.item_availability > 0);

            setMenuItems(menuItemsData);
            setFilteredItems(filteredMenuItems);
        };
        fetchMenus();

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [restaurantId]);

    useEffect(() => {
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

    // Tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <main className="content">
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <Link className='logotext' to="/restaurants">
                            <img src={logo} width={70}/>
                        </Link>
                    </div>
                    <div className="user-options">
                        <img src = {list} className='profile-button' width = {50} onClick={toggleProfileMenu} />
                        <div className={`profile-menu ${showProfileMenu ? 'show' : ''}`}>
                            <div className="profile-links">
                                {/* <Link to="/manager">Manager</Link> */}
                                <Link to="/profile">Profile</Link>
                                <Link to="/cart">Cart</Link>
                                <Link to="/orders">Orders</Link>
                                <Link to="/logout">Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* <div className="tabs">
                <button className={`tab-button ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => handleTabChange('menu')}>Menu</button>
                <button className={`tab-button ${activeTab === 'cart' ? 'active' : ''}`} onClick={() => handleTabChange('cart')}>Cart</button>
            </div> */}
            <div className="tab-content">
                {activeTab === 'menu' && menuItems.length > 0 && <MenuTab menuItems={filteredItems} />}
                {activeTab === 'cart' && <CartTab />}
            </div>
        </main>
    );
}

export default Menu;