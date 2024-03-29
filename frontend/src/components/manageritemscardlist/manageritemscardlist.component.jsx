import React from "react";
import { ManagerItemCard } from "../manageritemscard/manageritemscard.component";
import "./manageritemscardlist.styles.css";

// Create card list for menu items
export const ManagerItemCardList = ({ menuItems }) => (
    <div className="cardlist">
        {menuItems.map(item  => (
            <ManagerItemCard key={item.id} item={item}/>
        ))}
    </div>
);
