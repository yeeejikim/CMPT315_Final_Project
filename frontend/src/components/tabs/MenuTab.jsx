import React from "react";
import { MenuCardList } from "../menucardlist/menucardlist.component";
import { useState, useEffect } from "react";
import axios from "axios";

const MenuTab = ({ menuItems }) => {
    const [customers, setCustomers] = useState([]); // State to store customer data
    const [selectedCustomerId, setSelectedCustomerId] = useState(1); // Default customer ID to 1

    // Fetch customers from the backend
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get("/customers");
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    // Function to handle changing the selected customer ID
    const handleCustomerChange = (event) => {
        setSelectedCustomerId(parseInt(event.target.value));
    };

    return (
        <div>
            <h1 className="menuslist">Menu</h1>
            {/* <div className="dropdown-container">
                <select value={selectedCustomerId} onChange={handleCustomerChange} className="dropdown">
                    {customers.map(customer => (
                        <option key={customer.cust_id} value={customer.cust_id}>
                            {customer.cust_name} - ID: {customer.cust_id}
                        </option>
                    ))}
                </select>
            </div> */}
            <MenuCardList menuItems={menuItems} />
        </div>
    );
}

export default MenuTab;
