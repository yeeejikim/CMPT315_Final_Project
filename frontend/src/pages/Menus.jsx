import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import "./Menus.css";
import { MenuCardList } from '../components/menucardlist/menucardlist.component';
import { SearchBar } from '../searchbar/searchbar.component';
import { Link } from 'react-router-dom';

function Menu() {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(menuItems);
    
    useEffect(() => {
        const fetchMenus = async() => {
            const response = await axios.get(`/menus`);
            setMenuItems(response.data);
            setFilteredItems(response.data);
        };
        fetchMenus();
    }, []);

    const handleInput = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = menuItems.filter(menu =>
            menu && menu.item_name && menu.item_name.toLowerCase().includes(searchTerm)
        );
        setFilteredItems(filtered);
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
                        <Link className='profile-pic' to="/">Profile</Link>
                    </div>
                </div>
            </header>
            <h1 className="menuslist">Menu</h1>
            <MenuCardList menuItems={filteredItems} />
        </main>
    );
}

export default Menu;