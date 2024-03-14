import React, { useState, useEffect, Component } from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/Button";
import "./Menus.css";
import { MenuCardList } from '../components/menucardlist/menucardlist.component';

function Menu() {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenus = async() => {
            const response = await axios.get("/menu");
            setMenuItems(response.data);
        };
        fetchMenus();
    }, []);

    return (
        <main className="content">
            <h1 className="menuslist">Menu</h1>
            <MenuCardList menuItems={menuItems} />
        </main>
    );
}

export default Menu;