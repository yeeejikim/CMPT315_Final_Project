import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StatisticsTab = () => {
    const [orders, setOrders] = useState([]);
    const [managerRestaurantId, setManagerRestaurantId] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [topItems, setTopItems] = useState([]);
    const [top5Hours, setTopHours] = useState([]);
    const [menuItems, setMenuItems] = useState({});
    const [totalSales, setTotalSales] = useState(0);
    const [topPickupTimes, setTopPickupTimes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { managerId } = useParams();

    // Get the managerId and restaurantID for later use
    useEffect(() => {
        const fetchManagerData = async () => {
            try {
                const managerResponse = await axios.get(`/managers/${parseInt(managerId)}`);
                const managerData = managerResponse.data;
                setManagerRestaurantId(managerData.restaurant);
            } catch (error) {
                console.error('Error fetching manager data:', error);
            }
        };
        fetchManagerData();
    }, [managerId]);

    // Grab all the orders in the database
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/orders");
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    // Get all the menu items from the database
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get("/menus");
                const items = {};
                // Map each item with the name and price
                response.data.forEach(item => {
                    items[item.item_id] = {
                        name: item.item_name,
                        price: parseFloat(item.item_price)
                    };
                });
                setMenuItems(items);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };
        fetchMenuItems();
    }, []);

    // Filter the orders so that only the correct restaurant
    useEffect(() => {
        if (managerRestaurantId !== null) {
            const filtered = orders.filter(order => order.restaurant === managerRestaurantId);
            setFilteredOrders(filtered);
        }
    }, [orders, managerRestaurantId]);

    // Used to create the statistics
    useEffect(() => {
        if (filteredOrders.length > 0 && Object.keys(menuItems).length > 0) {
            // Get all the items and find the most popular items
            const itemPopularity = {};
            filteredOrders.forEach(order => {
                order.menuItems.forEach(itemId => {
                    if (itemPopularity[itemId]) {
                        itemPopularity[itemId] += 1;
                    } else {
                        itemPopularity[itemId] = 1;
                    }
                });
            });

            // Sort the object from most popular to least
            const sortedItems = Object.keys(itemPopularity).sort((a, b) => itemPopularity[b] - itemPopularity[a]);
            // Get the top 10 items
            const top10Items = sortedItems.slice(0, 10).map(itemId => ({
                name: menuItems[itemId].name,
                price: menuItems[itemId].price
            }));
            setTopItems(top10Items);

            const hourPopularity = {};
            // Get all the order and find the most popular order time
            filteredOrders.forEach(order => {
                const orderTime = new Date(order.order_time);
                const hour = orderTime.getHours();
                if (hourPopularity[hour]) {
                    hourPopularity[hour] += 1;
                } else {
                    hourPopularity[hour] = 1;
                }
            });
            // Sort the object from most popular to least
            const sortedHours = Object.keys(hourPopularity).sort((a, b) => hourPopularity[b] - hourPopularity[a]);
            // Get the top 5 ordering hours and convert to 12 hour format
            const top5Hours = sortedHours.slice(0, 5).map(hour => convertTo12HourFormat(hour));
            setTopHours(top5Hours);

            const pickupTimePopularity = {};
            // Get all the order and find the most popular pickup time
            filteredOrders.forEach(order => {
                const pickupTime = new Date(order.order_pickup);
                const hour = pickupTime.getHours();
                if (pickupTimePopularity[hour]) {
                    pickupTimePopularity[hour] += 1;
                } else {
                    pickupTimePopularity[hour] = 1;
                }
            });
            // Sort the object from most popular to least
            const sortedPickupTimes = Object.keys(pickupTimePopularity).sort((a, b) => pickupTimePopularity[b] - pickupTimePopularity[a]);
            // Get the top 5 pickup hours and convert to 12 hour format
            const top5PickupTimes = sortedPickupTimes.slice(0, 5).map(hour => convertTo12HourFormat(hour));
            setTopPickupTimes(top5PickupTimes);

            // Calculate the total sales from each order
            const totalSales = filteredOrders.reduce((total, order) => {
                order.menuItems.forEach(itemId => {
                    const item = menuItems[itemId];
                    if (item && item.price) {
                        total += parseFloat(item.price);
                    }
                });
                return total;
            }, 0);
            setTotalSales(totalSales);
            // Set loading to false meaning all data has been loaded
            setIsLoading(false);
        }
    }, [filteredOrders, menuItems]);

    // Conver the 24 hour format to 12 hour format
    function convertTo12HourFormat(hour) {
        if (hour === 0) {
            return "12 AM";
        } else if (hour === 12) {
            return "12 PM";
        } else if (hour < 12) {
            return hour + " AM";
        } else {
            return (hour - 12) + " PM";
        }
    }

    return (
        <div>
            <h2>Statistics</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="statistics-container">
                    <div className="top-items">
                        <h3>Total Sales</h3>
                        <ul> ${totalSales.toFixed(2)} </ul>
                        <div>
                            <h3>Top 10 Most Popular Items</h3>
                            <ul>
                                {topItems.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - ${item.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <h3>Top 5 Most Popular Ordering Hours</h3>
                        <ul>
                            {top5Hours.map((hour, index) => (
                                <li key={index}>Hour: {hour}</li>
                            ))}
                        </ul>
                        <h3>Top 5 Most Popular Pickup Times</h3>
                        <ul>
                            {topPickupTimes.map((hour, index) => (
                                <li key={index}>Hour: {hour}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatisticsTab;
