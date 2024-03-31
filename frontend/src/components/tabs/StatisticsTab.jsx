import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const StatisticsTab = () => {
    const [orders, setOrders] = useState([]);
    const [managerRestaurantId, setManagerRestaurantId] = useState(null);
    const managerId = useParams();
    const [topItems, setTopItems] = useState([]);
    const [top5Hours, setTopHours] = useState([]);
    const [menuItems, setMenuItems] = useState({});

    // Get the manager id and restaurant id
    useEffect(() => {
        const fetchManagerData = async () => {
            try {
                const managerResponse = await axios.get(`/managers/${parseInt(managerId['managerId'])}`);
                const managerData = managerResponse.data;
                setManagerRestaurantId(managerData.restaurant);
            } catch (error) {
                console.error('Error fetching manager data:', error);
            }
        };
        fetchManagerData();
    }, [managerId]);

    // Get the orders from that restaurant
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

    // Get menu items from the backend
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get("/menus");
                const items = {};
                response.data.forEach(item => {
                    items[item.item_id] = item.item_name;
                });
                setMenuItems(items);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };
        fetchMenuItems();
    }, []);

    // Calculate statistics
    useEffect(() => {
        if (orders.length > 0) {
            // Calculate item popularity
            const itemPopularity = {};
            orders.forEach(order => {
                order.menuItems.forEach(item => {
                    if (itemPopularity[item]) {
                        itemPopularity[item] += 1;
                    } else {
                        itemPopularity[item] = 1;
                    }
                });
            });
            // Sort item popularity
            const sortedItems = Object.keys(itemPopularity).sort((a, b) => itemPopularity[b] - itemPopularity[a]);
            // Get top 10 most popular items
            const top10Items = sortedItems.slice(0, 10).map(itemId => menuItems[itemId]);
            setTopItems(top10Items);

            // Calculate hour popularity
            const hourPopularity = {};
            orders.forEach(order => {
                const orderTime = new Date(order.order_time);
                const hour = orderTime.getHours();
                if (hourPopularity[hour]) {
                    hourPopularity[hour] += 1;
                } else {
                    hourPopularity[hour] = 1;
                }
            });
            // Sort hour popularity
            const sortedHours = Object.keys(hourPopularity).sort((a, b) => hourPopularity[b] - hourPopularity[a]);
            // Get top 5 most popular hours
            const top5Hours = sortedHours.slice(0, 5);
            setTopHours(top5Hours);
        }
    }, [orders]);

    function convertTo12HourFormat(hour) {
        if (hour === 0) {
            return "12 AM";
        } else if (hour == 12) {
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
            <div className="statistics-container">
                <div className="top-items">
                    <h3>Top 10 Most Popular Items</h3>
                    <ul>
                        {topItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <h3>Top 5 Most Popular Ordering Hours</h3>
                    <ul>
                        {top5Hours.map((hour, index) => (
                            <li key={index}>Hour: {convertTo12HourFormat(hour)}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default StatisticsTab;