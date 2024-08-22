import React, { useEffect, useState, useContext} from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { RestaurantContext } from '../Context/RestaurantContext';
import { SingleRestaurantContext } from '../Context/SingleRestaurantContext';

const PopDishes = ({ }) => {
const [dishesData, setDishesData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const { restaurant } = useContext(SingleRestaurantContext);
useEffect(() => {
const fetchDishes = async () => {
if (!restaurant || !restaurant._id) {
setError('No restaurant selected');
setLoading(false);
return;
}

try {
const restaurantId = restaurant._id;
// console.log("restaurantId: ", restaurantId);

// Fetch the menu using the restaurantId
const menuResponse = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}`);
const menus = menuResponse.data;
if (menus.length === 0) {
throw new Error('No menus found for the specified restaurant ID.');
}
const menuId = menus[0].menu_id;
// console.log("menuId: ", menuId);
// Fetch the dishes using the menuId
const dishesResponse = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`);
const dishes = dishesResponse.data.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 4);
setDishesData(dishes);
} catch (err) {
setError('Error fetching dishes');
console.error(err);
} finally {
setLoading(false);
}
};
fetchDishes();
}, [restaurant]);
if (loading) {
return <ActivityIndicator size="large" color="#FF9400" />;
}
if (error) {
return <Text style={styles.errorText}>{error}</Text>;
}

return (
<View style={styles.popularDishes}>
<View style={styles.dishTop}>
<Feather name='award' color={'#E65100'} size={25}/>
<Text style={styles.popularTitle}>Popular Dishes</Text>
</View>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
<View style={styles.dishMiddle}>
{dishesData.map((dish,index)=> (
<View key={dish._id || index} style={styles.dishesContainer}>
<Image source={{uri: dish.image|| 'https://via.placeholder.com/110x82'}} style={styles.dishesImage}/>
<Text style={styles.dishesName}>{dish.name}</Text>
</View>
))}
</View>
</ScrollView>
</View>
);
};

const styles = StyleSheet.create({
popularDishes: {
marginTop: 50
},
dishTop: {
flexDirection: 'row',
// backgroundColor: "pink"
},
popularTitle: {
color: '#221C19',
fontSize: 16,
fontWeight: '600',
marginLeft: 5,
marginTop: 2
},
dishMiddle:{
marginVertical: 15,
marginHorizontal: 5,
flexDirection: 'row',

},
dishesContainer: {
width: 110,
marginRight: 8
},
dishesImage: {
width: 110,
height: 82,
borderRadius: 10
},
dishesName:{
color: '#636363',
fontSize: 12,
fontWeight: '500',
textAlign: 'left',
paddingTop: 5
},

});

export default PopDishes;