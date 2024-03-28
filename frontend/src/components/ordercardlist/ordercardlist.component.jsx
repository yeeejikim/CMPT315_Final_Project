import React from "react";
import { OrderCard } from "../order/ordercard.component";
import "./ordercardlist.styles.css"

// Create orders card list
export const OrderCardList = ({ orders }) => (
    <div className="cardlist">
        {orders.map(order  => (
            <OrderCard key={order.id} order={order} />
        ))}
    </div>
);
