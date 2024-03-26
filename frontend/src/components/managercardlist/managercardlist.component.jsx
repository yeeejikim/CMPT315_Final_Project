import React from "react";
import { ManagerCard } from "../managercard/managercard.component";
import "./managercardlist.styles.css";
export const ManagerCardList = ({ managers }) => (
    <div className="cardlist">
        {managers.map(manager => (
            <ManagerCard key={manager.id} manager={manager} />
        ))}
    </div>
);
