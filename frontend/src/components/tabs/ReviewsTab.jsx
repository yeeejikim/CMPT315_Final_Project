import React, { useState, useEffect} from "react"
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewsTab = () => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [managerRestaurantId, setManagerRestaurantId] = useState(null);
    const managerId = useParams();

    useEffect(() => {
        const fetchManagerData = async () => {
            const managerResponse = await axios.get(`/managers/${parseInt(managerId['managerId'])}`);
            const managerData = managerResponse.data;
            setManagerRestaurantId(managerData.restaurant);
        };
        fetchManagerData();
    }, [managerId]);

    // Get the orders from that restaurant
    useEffect(() => {
        const fetchReviews = async () => {
            const response = await axios.get("/reviews");
            setReviews(response.data);
        };
        fetchReviews();
    }, []);

    // Filter orders to show only orders that are not complete
    useEffect(() => {
        if (managerRestaurantId !== null) {
            const filtered = reviews.filter(review => review.restaurant === managerRestaurantId);
            setFilteredReviews(filtered);
        }
    }, [reviews, managerRestaurantId]);

    return (
        <div>
            <h2>Reviews</h2>
            {filteredReviews.map((item) => {
              return(
				  <div>
                    <p><h>Customer {item.customer}</h>: {item.review_text}</p>
                  </div> 
              );
            })}
        </div>
    );
}
export default ReviewsTab;