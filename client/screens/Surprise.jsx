import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Text, Platform, ActivityIndicator } from 'react-native';
import axios from 'axios';
import RestaurantCard from '../Components/RestroCards';
import DishCard from '../Components/DishCards';
import ToggleButton from '../Components/ToggleButton';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';
import { RestaurantContext } from '../Context/RestaurantContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-deck-swiper';


const Surprise = ({navigation}) => {
  const { user, setUser } = useContext(AuthContext); 
  // const [randomRestaurant, setRandomRestaurant] = useState(null);
  const { restaurant, dishData, loading, error } = useContext(RestaurantContext);
  const [showRestaurant, setShowRestaurant] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const handleToggle = (isRestro) => {
    setShowRestaurant(isRestro);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRefresh = () => {
    setCardIndex(0);
  };
  // const handleRefresh = () => {
  //   if (showRestaurant) {
  //     fetchRestaurants();
  //   } else {
  //     fetchDishes();
  //   }
  // };

  // const handleLike = async (item) => {
  //   if (!user || !item) {
  //     console.warn('User not logged in or no item available');
  //     return;
  //   }
  
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     if (!token) {
  //       console.error('Token is missing');
  //       return;
  //     }
  
  //     const isRestaurant = showRestaurant; // Determine if it's a restaurant or dish
  //     const url = isRestaurant 
  //       ? `http://localhost:6868/auth/user/${user.id}/favourites/restaurant`
  //       : `http://localhost:6868/auth/user/${user.id}/favourites/dish`;
  
  //     const body = isRestaurant 
  //       ? { userId: user.id, restaurantId: item._id, action: 'add' }
  //       : { userId: user.id, dishId: item._id, action: 'add' };
  
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(body),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(`Failed to add to favourites: ${errorData.message || 'Unknown error'}`);
  //     }
  
  //     const data = await response.json();
      
  //     if (isRestaurant) {
  //       const updatedUser = { ...user, favouriteRestaurant: data.favourite_restaurant };
  //       setUser(updatedUser);
  //       console.log(`Restaurant ${item.name} added to favourites`);
  //     } else {
  //       const updatedUser = { ...user, favouriteDish: data.favourite_dish };
  //       setUser(updatedUser);
  //       console.log(`Dish ${item.name} added to favourites`);
  //     }
  
  //   } catch (error) {
  //     console.error('Error adding to favourites:', error);
  //   }
  // };

  const handleLike = async (item) => {
    if (!user || !item) {
      console.warn('User not logged in or no item available');
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token is missing');
        return;
      }
  
      const isRestaurant = showRestaurant;
      const url = isRestaurant 
        ? `http://localhost:6868/auth/user/${user.id}/favourites/restaurant`
        : `http://localhost:6868/auth/user/${user.id}/favourites/dish`;
  
      const body = isRestaurant 
        ? { userId: user.id, restaurantId: item._id, action: 'add' }
        : { userId: user.id, dishId: item._id, action: 'add' };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add to favourites: ${errorData.message || 'Unknown error'}`);
      }
  
      const data = await response.json();
      
      if (isRestaurant) {
        const updatedUser = { ...user, favouriteRestaurant: data.favourite_restaurant };
        setUser(updatedUser);
        console.log(`Restaurant ${item.name} added to favourites`);
      } else {
        const updatedUser = { ...user, favouriteDish: data.favourite_dish };
        setUser(updatedUser);
        console.log(`Dish ${item.name} added to favourites`);
      }
  
    } catch (error) {
      console.error('Error adding to favourites:', error);
    }
  };


  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#221C19" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Feather name="arrow-left" size={24} color="#221C19" />
            <Text style={styles.normalText}>Back</Text>
          </TouchableOpacity>
          <ToggleButton style="icon-based" onToggle={handleToggle} initialState={!showRestaurant}/>
        </View>

        <View style={styles.cardContainer}>
          {/* <Swiper>
            ref = {swiper => {
              this.swiper = swiper;
            }}

            onSwiped = {() => this.onSwiped('general')}
            onSwipedLeft = {() => this.onSwiped('left')}
            onSwipedRight = {() => this.onSwiped('right')}
            onTapCard = {this.swipedLeft}
            cards = {this.state.cards}
            cardIndex = {this.state.cardIndex}
            renderCard = {this.renderCard}
            onSwipedAll = {this.onSwipedAllCards}
            stackSize = {3}
            stackSeparation = {15}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
          </Swiper> */}

          {showRestaurant && restaurant.length > 0 ? (
          <Swiper
              cards={restaurant}
              renderCard={(restaurant) => (
                <RestaurantCard restaurant={restaurant} layout="surprise" />
              )}
              cardIndex={cardIndex}
              onSwipedRight={(cardIndex) => handleLike(restaurant[cardIndex])}
              onSwipedLeft={(cardIndex)=> {
                if (cardIndex === restaurant.length - 1) {
                  handleRefresh();
                }
              }} 
              backgroundColor={'#FFB300'}
              stackSize={3}
              stackSeparation={15}
              animateOverlayLabelsOpacity
              animateCardOpacity
              swipeBackCard
              cardStyle={{ justifyContent: 'center', alignItems: 'center', left: 3, top: -80 }} 
            />
            // <View>
            //   {randomRestaurant && (
            //     <RestaurantCard restaurant={randomRestaurant} layout="surprise" />
            //   )}
            //     <View style={styles.stackcard1}></View>
            //     <View style={styles.stackcard2}></View>
            // </View>
          ) : (
            // <View layout='cardStack'>

            //   <DishCard layout='surprise' />
            //   <View style={styles.stackcard1}></View>
            //   <View style={styles.stackcard2}></View>
            // </View>
            <Swiper
            cards={dishData}
            renderCard={(dish) => (
              <DishCard dish={dish} layout="surprise" restaurant={dish.restaurant}/>
            )}
            cardIndex={cardIndex}
            onSwipedRight={(cardIndex) => handleLike(dishData[cardIndex])}
            onSwipedLeft={(cardIndex)=> {
                if (cardIndex === dishData.length - 1) {
                  handleRefresh();
                }
            }} 
            backgroundColor={'#FFB300'}
            stackSize={3}
            stackSeparation={15}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard
            cardStyle={{ justifyContent: 'center', alignItems: 'center', left: 3, top: -80 }} 
          />

          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.smallButton} >
           <Feather name="rotate-ccw" size={24} color="#9e9e9e" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.mehButton} onPress={handleRefresh}>
            <Feather name="meh" size={40} color="#FFEDD1" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.likeButton}>
            <Ionicons name="heart" size={40} color="#FFEDD1" onPress={handleLike} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton}>
            <Ionicons name="navigate-outline" size={24} color="#FFB300" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#FFB300', 
  },

  cardStack:{
    width: windowWidth * 0.8,
    height: windowHeight * 0.55,
    justifyContent:'center',
    alignItems:'center',
  },

  stackcard1:{
    width: windowWidth * 0.75,
    height: windowHeight * 0.52,
    borderRadius:20,
    overflow:'hidden',
    backgroundColor:'#fff',
    position:'absolute',
    bottom:30,
    left:10,
    zIndex:-1,
    ...Platform.select({
      ios: {
        shadowColor: '#221C19',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  stackcard2:{
    width: windowWidth * 0.7,
    height: windowHeight * 0.5,
    borderRadius:20,
    overflow:'hidden',
    backgroundColor:'#fff',
    position:'absolute',
    bottom:20,
    left:20,
    zIndex:-2,
    ...Platform.select({
      ios: {
        shadowColor: '#221C19',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  toggleContainer: {
    flexDirection:'row',
    width: '100%',
    alignItems:'center',
    justifyContent:'space-between',
    zIndex: 1,
  },

  backButton:{
    flexDirection: 'row',
    alignItems: 'center',
    left: 10,
  },

  cardContainer: {
    flex:1,
    justifyContent:'center',
    width: '100%',
    alignItems: 'center',
  },

  normalText: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    color: '#221C19',
    marginLeft: 5,
  },

  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    width: '115%',
  },

  smallButton:{
    width:40,
    height:40,
    backgroundColor:'#fff',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  mehButton: {
    width: 80,
    height:80,
    backgroundColor:'#536DFE',
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  likeButton:{
    width: 80,
    height:80,
    backgroundColor:'#E65100',
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  }
});

export default Surprise;
