import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
    const [restaurant, setRestaurant] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [dishData, setDishData] = useState([]);
    const [topDishes, setTopDishes] = useState([]);
    const [menuRestroMap, setMap] = useState([])

    const fetchRestaurants = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:6868/restaurants`);
            const data = await response.json();
            setRestaurant(data);

            const dishesResponse = await fetch("http://localhost:6868/dishes");
            const dishesData = await dishesResponse.json();

            const menuResponse = await fetch("http://localhost:6868/menus");
            const menuData = await menuResponse.json();

            const menuToRestaurantMap = menuData.reduce((map, menu) => {
                map[menu._id] = menu.restaurant_id;
                return map;
            }, {});

            setMap(menuToRestaurantMap);

            console.log("RestaurantContext - menuToRestaurantMap: ", menuToRestaurantMap);

            const topDishes = dishesData
                .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
                .slice(0, 10)
                .map(dish => {
                    const restaurantId = menuToRestaurantMap[dish.menu_id];
                    const restaurant = data.find(r => r._id === restaurantId);
                    return { ...dish, restaurant };
                });

            setTopDishes(topDishes);

            const allDishes = dishesData
            .map(dish => {
                const restaurantId = menuToRestaurantMap[dish.menu_id];
                const restaurant = data.find(r => r._id === restaurantId);
                return { ...dish, restaurant };
            });

            setDishData(allDishes);

            // console.log("RestaurantContext - topDishes: ", topDishes);
            // const allDishes = dishesResponse.data
            // .map(dish => {
            // const restaurantId = menuToRestaurantMap[dish.menu_id];
            // const restaurant = restaurantsResponse.data.find(r => r._id === restaurantId);
            // return { ...dish, restaurant };
            // });
            // console.log("Home - allDishes: ", allDishes);
        } catch (error) {
            setError('Error fetching restaurant data');
            console.error('Error fetching restaurant:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (restaurant.length === 0) {
            fetchRestaurants();
        }
    }, [])

    // console.log("RestaurantContext - topDishes: ", topDishes[0].restaurant)

    const value = {
        restaurant,
        loading,
        error,
        dishData, topDishes, menuRestroMap
    }

    // const fetchRestaurant = useCallback(async (restaurantId) => {
    // console.log("runs")
    // i
    // }, [lastFetchedId, restaurant]);

    return (
        <RestaurantContext.Provider value={value}>
            {children}
        </RestaurantContext.Provider>
    );
};