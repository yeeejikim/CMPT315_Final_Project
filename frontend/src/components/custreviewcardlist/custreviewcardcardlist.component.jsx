import React from "react";
import { CustReviewCard } from "../custreviewcard/custreviewcard.component";
import "./custreviewcardcardlist.styles.css"

// Create orders card list
export const CustReviewCardList = ({ orders }) => (
    <div className="cardlist">
        {orders.map(order  => (
            <CustReviewCard key={order.id} order={order} />
        ))}
    </div>
);
