import React, { useState, useEffect, useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
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

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.logContainer}>
        <View style={styles.notLog}>
          <Text style={styles.loginText}>Please log in to see your favorite restaurants and dishes.</Text>
          <TouchableOpacity style={styles.signin} onPress={handleLogin}>
            <Text style={styles.textSign}>
              Login
            </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
            <SafeAreaView style={styles.container}>
            <Image source={require('../assets/FavsRestro.png')} style={styles.heartImage}/>
            <View style={styles}>
                <Text style={styles.titleText}>Add your favs here!</Text>
            </View>
            </SafeAreaView>
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
              <SafeAreaView style={styles.container}>
              <Image source={require('../assets/FavsDish.png')} style={styles.heartImage}/>
              <View style={styles}>
                  <Text style={styles.titleText}>Add your favs here!</Text>
              </View>
          </SafeAreaView>
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
  logContainer:{
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',    
  },
  notLog:{
    flex: 1,
    width: 300,
    marginTop: 200,
    alignItems:'center'
  },
  loginText: {
    fontSize: 18,
    fontFamily: 'Ubuntu-Medium',
    textAlign: 'center',
    marginTop: 50,
  },

  signin:{
    width: '80%',
    paddingVertical: 10,
    backgroundColor: '#E65100',
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 30,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset : {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  textSign: {
    fontSize: 16,
    fontFamily:'Ubuntu-Medium',
    color: 'white',
    textAlign: 'center',
  },
  heartImage:{
    width:200,
    height: 200,
    marginTop: 50,
    marginLeft: 10
  },
  titleText:{
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    width: 220,
    textAlign: 'center',
    marginTop: 20
  },
});

export default Liked;