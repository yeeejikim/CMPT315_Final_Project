import React from "react";
import { Card } from '../menucard/menucard.component.jsx'
import "./menucardlist.styles.css";

// Create card list for menu items
export const MenuCardList = ({ menuItems }) => (
    <div className="cardlist">
        {menuItems.map(item  => (
            <Card key={item.id} item={item} />
        ))}
    </div>
);
