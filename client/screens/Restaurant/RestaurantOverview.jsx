import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import InfoCard from '../../Components/InfoCard';
import PopDishes from '../../Components/PopDishes';
import PhotoCard from '../../Components/PhotoCard';
import ReviewCard from '../../Components/ReviewCard';
import { RestaurantContext } from '../../Context/RestaurantContext';
import { useNavigation } from '@react-navigation/native';
import { SingleRestaurantContext } from '../../Context/SingleRestaurantContext';

const RestaurantOverview = ({ onTabChange}) => {
const { restaurant, loading, error } = useContext(SingleRestaurantContext);

// console.log("restaurant: ", restaurant);

const navigation = useNavigation();
const goToMenu = () => {
if (onTabChange) {
onTabChange('menu');
}
}

const goToPhotos = () => {
if (onTabChange) {
onTabChange('photos');
}
}

const goToReviews = () => {
if (onTabChange) {
onTabChange('review');
}
}

const handleLeaveReview = () =>{
navigation.navigate('leaveReview');
}

if (loading) {
return <ActivityIndicator size="large" color="#0000ff" />;
}

if (error) {
return <Text>Error loading restaurant data: {error}</Text>;
}

if (!restaurant) {
return <Text>No restaurant data available</Text>;
}


return (
<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
<InfoCard restaurant={restaurant} />
<View style={styles.threeSection}>
<PopDishes restaurantId={restaurant}/>
<View style={styles.dishBottom}>
<TouchableOpacity style={styles.menuButton} onPress={goToMenu}>
<Text style={styles.buttonText1}>Explore Full Menu</Text>
</TouchableOpacity>
</View>
<TouchableOpacity onPress={goToPhotos}>
<PhotoCard restaurant={restaurant} />
</TouchableOpacity>

<TouchableOpacity onPress={goToReviews}>
<ReviewCard restaurant={restaurant} />
</TouchableOpacity>

<TouchableOpacity style={styles.leaveButton} onPress={handleLeaveReview}>
<Text style={styles.buttonText2}>Leave a Review</Text>
</TouchableOpacity>
</View>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,

},
threeSection: {
marginTop: 140,
marginBottom: 60,
marginHorizontal: 12,
},

leaveButton: {
backgroundColor: 'white',
borderWidth: 2,
borderColor:'#FFB300',
alignItems: 'center',
width: 350,
height: 30,
borderRadius: 20,
justifyContent: 'center',
alignContent: 'center',
alignSelf: 'center',
},
buttonText2: {
fontSize: 16,
color: '#FFB300',
fontFamily:'Ubuntu-Medium'
},

dishBottom: {
justifyContent: 'center',
alignItems: 'center'
},
menuButton: {
width: 350,
height: 30,
backgroundColor: '#FF9400',
borderRadius: 20,
alignItems: 'center',
justifyContent: 'center'
},
buttonText1: {
color: 'white',
fontFamily:'Ubuntu-Medium',
fontSize: 16,
},
});

export default RestaurantOverview;