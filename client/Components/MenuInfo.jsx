import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { View, StyleSheet, Linking, ActivityIndicator, Text } from 'react-native';
import MenuDetails from '../screens/Restaurant/MenuDetails';
import { RestaurantContext } from '../Context/RestaurantContext';
import FloatingSearchBar from './FloatingSearchBar';
import ImageUpload from './UploadImage';
import filter from 'lodash.filter';
import { SingleRestaurantContext } from '../Context/SingleRestaurantContext';

const MenuInfo = ({ }) => {
const [menuItems, setMenuItems] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [restaurantId, setRestaurantId] = useState(null);
const [isEnabled, setIsEnabled] = useState(false);
const [query, setQuery] = useState('');
const [data, setData] = useState([]);
const [fullData, setFullData] = useState([]);
const { restaurant } = useContext(SingleRestaurantContext);

// console.log("filtered data: ", data);
// console.log("full data: ", fullData);

const handleSearch = () => {
// console.log("menu info - handleSearch no. 1 - handle search...");
// console.log("type of query is string? 1: ", typeof query !== "string")
// console.log("type of query is not string? 2: ", typeof query !== "string")
// console.log("type of query is object? 2: ", typeof query === "object")
if (typeof query !== "string") {
setQuery('');
console.log("Set query to be: ", query);
}

try {
// console.log("menu info - handleSearch no. 2 - query: ", query);

// console.log("menu info - handleSearch no. 3 - query.type: ", query.type);

// if (typeof query !== String || query.type === undefined) {
// setQuery('');
// } else {
const formattedQuery = query.toLowerCase();
// console.log("MenuInfo - handleSearch no. 4 - formattedQuery: ", formattedQuery);
const filteredData = filter(fullData, (dish) => {
return contains(dish, formattedQuery);
});
setData(filteredData);
// setMenu(filteredData);
// }
} catch (error) {
setError('Error reset data');
console.error('Error reset data:', error);
}};

const contains = (dishInfo, query) => {
if (dishInfo.name.toLowerCase().includes(query) || dishInfo.description.toLowerCase().includes(query) || dishInfo.category.toLowerCase().includes(query)) {
return true;
}
return false;
};

useEffect(() => {
// console.log("Query changed: ", query);
// handleSearch()
}, [menuItems]);

const handleClear = () => {
setQuery('');
setData(fullData); // Reset data to fullData when cleared
};

const handleDismissKeyboard = () => {
Keyboard.dismiss(); // Dismiss keyboard and lose focus
};

const handleReset = () => {
// console.log("menu info - handleReset - typeof query: ", typeof query);
if (typeof query !== "string" || typeof query !== "object") {
setQuery('');
// console.log("menu info - handleReset 2 - typeof query: ", typeof query);
// handleDismissKeyboard();
// handleSearch();
} else {
setQuery('');
}
// setQuery('');
// console.log("menu info - handleReset 2 - typeof query: ", typeof query);
handleDismissKeyboard();
// handleSearch();
};

// useEffect(() => {
const fetchMenu = async () => {
if (!restaurant || !restaurant._id) {
setError('Invalid restaurant ID');
setLoading(false);
return;
}

try {
setLoading(true);
const { _id: restaurantId } = restaurant;
setRestaurantId(restaurantId);
console.log("restaurantId: ", restaurantId);

const { data: menus } = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}`);

if (!menus.length) {
throw new Error('No menus found for this restaurant.');
}

const { menu_id: menuId } = menus[0];
const { data: dishes } = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`);

// setMenuItems(dishes);
setData(dishes);
setFullData(dishes);
} catch (error) {
setError(error.message || 'Error fetching menu data');
console.error('Error fetching restaurant menu:', error);
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchMenu();
}, [restaurant]);

if (loading) {
return (
<View style={[StyleSheet.absoluteFill, {justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)'}]}>
<ActivityIndicator size="large" color="#FFC93C" />
</View>
);
}

if (error) {
return (
<View style={styles.errorContainer}>
<Text>{error}</Text>
</View>
);
}

return (
<View style={{ flex: 1, flexDirection: 'column' }}>
{/* <MenuDetails menuItems={menuItems} /> */}
<FloatingSearchBar
query={query}
setQuery={setQuery}
onSearch={handleSearch}
onClear={handleClear}
// onPress={handleReset}
/>
<MenuDetails menuItems={data} restaurant_id={restaurantId} />

<ImageUpload restaurantId={restaurantId} onPress={fetchMenu}/>
</View>
);

};

const styles = StyleSheet.create({
card: {
margin: 10,
},
ratingContainer: {
flexDirection: 'row',
alignItems: 'center',
marginVertical: 5,
},
stars: {
flexDirection: 'row',
marginRight: 5,
},
cuisineContainer: {
flexDirection: 'row',
flexWrap: 'wrap',
marginTop: 5,
},
chip: {
margin: 2,
},
website: {
color: 'blue',
textDecorationLine: 'underline',
marginTop: 5,
}
});

export default MenuInfo;