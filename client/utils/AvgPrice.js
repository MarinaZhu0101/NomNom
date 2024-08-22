import axios from 'axios';

export const calculateAveragePrice = async (restaurantId) => {
  if (!restaurantId) {
    console.error('calculateAveragePrice called with undefined restaurantId');
    return null;
  }

  try {
    // console.log(`Calculating average price for restaurant ${restaurantId}`);

    const menuResponse = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}`);
    // console.log('Menu response:', menuResponse.status, menuResponse.statusText);
    const menus = menuResponse.data;

    if (!menus || menus.length === 0) {
      console.log(`No menus found for restaurant ${restaurantId}`);
      return null;
    }

    const { menu_id: menuId } = menus[0];

    const dishesResponse = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`);
    console.log('Dishes response:', dishesResponse.status, dishesResponse.statusText);
    const dishes = dishesResponse.data;

    if (!dishes || dishes.length === 0) {
      console.log(`No dishes found for restaurant ${restaurantId}`);
      return null;
    }

    const validDishes = dishes.filter(dish => 
      typeof dish.price === 'number' && !isNaN(dish.price) && dish.price > 0 &&
      !(dish.category && (
        dish.category.toLowerCase().includes('drink') ||
        dish.category.toLowerCase().includes('extra') ||
        dish.category.toLowerCase().includes('dip') ||
        dish.category.toLowerCase().includes('side') ||
        dish.category.toLowerCase().includes('dessert') ||
        dish.category.toLowerCase().includes('starter')
      ))
    );
    
    if (validDishes.length === 0) {
      console.log(`No valid dishes found for restaurant ${restaurantId} after filtering`);
      return null;
    }

    const totalPrice = validDishes.reduce((sum, dish) => sum + dish.price, 0);
    const averagePrice = totalPrice / validDishes.length;

    console.log(`Average price calculated for restaurant ${restaurantId}: ${averagePrice.toFixed(2)}`);
    console.log(`Total dishes: ${dishes.length}, Valid dishes after filtering: ${validDishes.length}`);
    
    return Number(averagePrice.toFixed(2));
  } catch (error) {
    console.error(`Error calculating average price for restaurant ${restaurantId}:`, error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return null;
  }
};