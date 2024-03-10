import React from "react";
import { Card } from '../card/restcard.component'
import "./restcardlist.styles.css";
export const CardList = ({ restaurants }) => (
    <div className="cardlist">
        {restaurants.map(restaurant => (
            <Card key={restaurant.id} restaurant={restaurant} />
        ))}
    </div>
);
