import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import TopTabs from '../../Components/TopTabs';
import { RestaurantContext } from '../../Context/RestaurantContext';
import { Feather } from '@expo/vector-icons';
import { SingleRestaurantContext } from '../../Context/SingleRestaurantContext.js';


const RestaurantDetails = ({ route, navigation }) => {
// console.log("Route params:", route.params);
const restaurantId = route.params?.restaurantId;
// console.log("Fetched restaurantId:", restaurantId);

const { fetchRestaurant, restaurant, loading, error } = useContext(SingleRestaurantContext);
const handleBack = () => {
navigation.goBack();
};


useEffect(() => {
// console.log("Fetched restaurantId:", restaurantId);
if (restaurantId) {
fetchRestaurant(restaurantId);
}
}, [restaurantId, fetchRestaurant]);

if (loading) {
return <ActivityIndicator size="large" color="#0000ff" />;
}

if (error) {
return <Text>Error: {error}</Text>;
}

return (
<SafeAreaView style={styles.container}>
<TouchableOpacity style={styles.backButton} onPress={handleBack}>
<Feather name="arrow-left" size={24} color="#9e9e9e" />
<Text style={styles.normalText}>Back</Text>
</TouchableOpacity>
<TopTabs />
</SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},

backButton:{
flexDirection: 'row',
alignItems: 'center',
backgroundColor:'white',
paddingHorizontal:16,
paddingVertical:6,
gap:5,
},

normalText: {
fontSize: 16,
fontFamily: 'Ubuntu-Medium',
color: '#9e9e9e',
},
});

export default RestaurantDetails;