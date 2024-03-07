import React from "react";
import { Restuarant } from "../restuarant/restaurant.component";

export const RestuarantList = ({restaurants}) => (
    <div className="restuarantList">
        {restaurants.map(restuarant =>(
            <Restuarant key={restuarant.id} restuarant={restuarant} />

        ))}
    </div>
);