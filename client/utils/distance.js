const toRadians = (degrees) => degrees * (Math.PI / 180);
const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; 
};

export const calculateDistance = (userLocation, restaurantLocation) => {
  if (!userLocation || !restaurantLocation) return null;

  const distanceInKm = calculateHaversineDistance(
    userLocation.coords.latitude,
    userLocation.coords.longitude,
    parseFloat(restaurantLocation.latitude),
    parseFloat(restaurantLocation.longitude)
  );

  return distanceInKm < 1 
    ? `${(distanceInKm * 1000).toFixed(0)}m` 
    : `${distanceInKm.toFixed(1)}km`;
};

export const addDistanceToRestaurants = (restaurants, userLocation) => {
  if (!userLocation || !restaurants.length) return restaurants;

  return restaurants.map(restaurant => ({
    ...restaurant,
    distance: calculateDistance(userLocation, restaurant)
  }));
};