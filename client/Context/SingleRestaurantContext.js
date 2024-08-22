import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const SingleRestaurantContext = createContext();

export const SingleRestaurantProvider = ({ children }) => {
const [restaurant, setRestaurant] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [lastFetchedId, setLastFetchedId] = useState(null)

const fetchRestaurant = useCallback(async (restaurantId) => {
if (restaurantId === lastFetchedId && restaurant) {
console.log("Restaurant data already fetched, skipping");
return;
}
setLoading(true);
setError(null);
try {
const response = await axios.get(`http://localhost:6868/restaurants/${restaurantId}`);
setRestaurant(response.data);
setLastFetchedId(restaurantId);
} catch (error) {
setError('Error fetching restaurant data');
console.error('Error fetching restaurant:', error);
} finally {
setLoading(false);
}
}, [lastFetchedId, restaurant]);

return (
<SingleRestaurantContext.Provider value={{ restaurant, loading, error, fetchRestaurant }}>
{children}
</SingleRestaurantContext.Provider>
);
};