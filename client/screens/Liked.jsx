import React, { useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import ToggleButton from '../Components/ToggleButton';
import RestaurantCard from '../Components/RestroCards';
import DishCard from '../Components/DishCards';
import Feather from '@expo/vector-icons/Feather';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { RestaurantContext } from '../Context/RestaurantContext';


const Liked = ({ navigation }) => {
  // const [showRestaurants, setShowRestaurants] = useState(true);
  // const [restaurants, setRestaurants] = useState([]);
  // const [dishes, setDishes] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  // console.log('User favourite restaurants:', user.favouriteRestaurant);
  const { restaurant, dishData } = useContext(RestaurantContext);
  const [showRestaurants, setShowRestaurants] = useState(false);


  // useEffect(() => {
  //   const fetchRestaurantsAndDishes = async () => {
  //     try {
  //       const restaurantsResponse = await axios.get('http://localhost:6868/restaurants');
  //       setRestaurants(restaurantsResponse.data);

  //       const dishesResponse = await axios.get('http://localhost:6868/dishes');
  //       setDishes(dishesResponse.data);

  //     } catch (err) {
  //       console.error("Error fetching restaurants:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchRestaurantsAndDishes();
  // }, []);

  const handleToggle = (isRestro) => {
    setShowRestaurants(isRestro);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // const handleRemoveRestaurant = (restaurantId) => {
  //   setRestaurants((prevRestaurants) => 
  //     prevRestaurants.filter((restaurant) => restaurant._id !== restaurantId)
  //   );

  //   // Also update the user context to reflect the removal
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     favouriteRestaurant: prevUser.favouriteRestaurant.filter(id => id !== restaurantId),
  //   }));
  // };

  // const handleRemoveDish = (dishId) => {
  //   setDishes((prevDishes) =>
  //     prevDishes.filter((dish) => dish._id !== dishId)
  //   );

  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     favouriteDish: prevUser.favouriteDish.filter(id => id !== dishId),
  //   }));
  // };
  
  const handleRemoveRestaurant = (restaurantId) => {
    setUser((prevUser) => ({
      ...prevUser,
      favouriteRestaurant: prevUser.favouriteRestaurant.filter(id => id !== restaurantId),
    }));
  };

  const handleRemoveDish = (dishId) => {
    setUser((prevUser) => ({
      ...prevUser,
      favouriteDish: prevUser.favouriteDish.filter(id => id !== dishId),
    }));
  };

  // const filteredRestaurants = restaurants.filter(restaurant => 
  //   user.favouriteRestaurant.includes(restaurant._id)
  // );

// const favouriteRestaurantSet = new Set(user.favouriteRestaurant);
//   const favouriteDishSet = new Set(user.favouriteDish);

//   const filteredRestaurants = restaurants.filter(restaurant => 
//     favouriteRestaurantSet.has(restaurant._id)
//   );

//   const filteredDishes = dishes.filter(dish => 
//     favouriteDishSet.has(dish._id)
//   );

  const favouriteRestaurantSet = new Set(user.favouriteRestaurant);
  const favouriteDishSet = new Set(user.favouriteDish);

  const filteredRestaurants = restaurant.filter(r => 
    favouriteRestaurantSet.has(r._id)
  );

  const filteredDishes = dishData.filter(dish => 
    favouriteDishSet.has(dish._id)
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Feather name="arrow-left" size={24} color="#6e6e6e" />
          <Text style={styles.normalText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Your Favs</Text>
      </View>

      <View style={styles.toggleContainer}>
        <ToggleButton style="pill" onToggle={handleToggle} />
      </View>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {showRestaurants ? (
           <View>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map(restaurant => (
                <RestaurantCard 
                  key={restaurant._id} 
                  restaurant={restaurant} 
                  layout="default" 
                  onRemove={handleRemoveRestaurant} 
                />
              ))
           ) : (
             <Text>No favourite restaurants found.</Text>
           )}
         </View>

        ) : (
          <View style='singleCard'>
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish) => (
                <DishCard 
                  key={dish._id}  
                  dish={dish}
                  layout="default" 
                  onRemove={handleRemoveDish}
                  restaurant={dish.restaurant}
                />
              ))
            ) : (
              <Text>No favourite dishes found.</Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: 'relative', 
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
    color: '#6e6e6e',
    marginLeft: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Ubuntu-Bold',
  },
  toggleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  cardContainer: {
    alignItems: 'center',
  },
});

export default Liked;