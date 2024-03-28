import React from "react";
import { CompOrderCard } from "../comporders/comporder.component";
import "./compordercardlist.styles.css"

// Create orders card list
export const CompOrderCardList = ({ orders }) => (
    <div className="cardlist">
        {orders.map(order  => (
            <CompOrderCard key={order.id} order={order} />
        ))}
    </div>
);
