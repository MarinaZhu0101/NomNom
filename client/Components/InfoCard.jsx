import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { RestaurantContext } from '../Context/RestaurantContext';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SingleRestaurantContext } from '../Context/SingleRestaurantContext';
import { calculateAveragePrice } from '../utils/AvgPrice';


const InfoCard = ({ }) => {

  const { restaurant, loading, error } = useContext(SingleRestaurantContext);
  const { user, setUser } = useContext(AuthContext);
  const [averagePrice, setAveragePrice] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const fetchAveragePrice = async () => {
      if (restaurant && restaurant._id) {
        const price = await calculateAveragePrice(restaurant._id);
        setAveragePrice(price);
      } else {
        console.error('Invalid restaurant object:', restaurant);
      }
    };

    fetchAveragePrice();
  }, [restaurant]);
  
  useEffect(() => {
    if (user && restaurant) {
      setIsPressed(user.favouriteRestaurant.includes(restaurant._id));
    }
  }, [user, restaurant]);

  const toggleFavourite = async () => {
    if (!user || !restaurant) {
      console.warn('User not logged in or no restaurant available');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token is missing');
        return;
      }

      const action = isPressed ? 'remove' : 'add';
      const response = await fetch(`http://localhost:6868/auth/user/${user.id}/favourites/restaurant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id, restaurantId: restaurant._id, action }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to ${action === 'add' ? 'add to' : 'remove from'} favourites: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const updatedUser = { ...user, favouriteRestaurant: data.favourite_restaurant };
      setUser(updatedUser);
      setIsPressed(!isPressed);

    } catch (error) {
      console.error(`Error ${action === 'add' ? 'adding to' : 'removing from'} favourites:`, error);
    }
  };

    if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!restaurant) {
    return <Text>Loading restaurant information...</Text>;
  }
  

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text>No data available</Text>
      </View>
    );
  }

  const { street1, city, state, country, postalcode } = restaurant.address_obj;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: restaurant.image[0].url }} style={styles.topImage} />
        {/* <TouchableOpacity style={styles.heartContainer}>
          <Feather name="heart" size={20} color="#fff" style={styles.heartIcon} />
        </TouchableOpacity> */}


        <TouchableOpacity
          style={styles.heartContainer}
          onPress={toggleFavourite}
          activeOpacity={1}
        >
          <Feather
            name="heart"
            size={20}
            color={isPressed ? '#E65100' : '#fff'}
            style={styles.heartIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadContainer}>
          <Feather name="upload" size={20} color="#fff" style={styles.uploadIcon} />
        </TouchableOpacity>
      </View>

<View style={styles.detailsContainer}>
  <Text style={styles.detailsText}>{restaurant.name}</Text>
  <View style={styles.ratingContainer}>
  <View style={styles.rating}>
    <MaterialIcons name='star' color={'#FFA900'} size={20} />
    <Text style={styles.ratingText}>{restaurant.rating}</Text>
  </View>
  <View style={styles.reviewNumber}>
    <Text style={styles.reviewNumberText}>
    {Object.values(restaurant.review_rating_count).reduce((sum, count) => sum + parseInt(count, 10), 0)}
  </Text>
    <Text style={styles.reviewNumberText}>reviews</Text>
  </View>
</View>
<View style={styles.addressContainer}>
  <View style={styles.address}>
     <Text style={styles.addressText}>{`${street1}, ${city}, ${state}, ${country} ${postalcode}`}</Text>
  </View>
  <View style={styles.distance}>
    <Text style={styles.distanceText}>2.4km away | </Text> 
    <Text style={styles.priceText}> Avg. Main €{averagePrice} </Text>
  </View>
  <View style={styles.type}>
      <Text style={styles.typeText}> {restaurant.cuisine && restaurant.cuisine.length > 0 ? restaurant.cuisine[0].localized_name : 'Cuisine not available'}</Text>
    <View style={styles.openButton}>
      <Text style={styles.openType}>open</Text>
     </View>
   </View>
          <View style={styles.twoButton}>
            <TouchableOpacity style={styles.map} onPress={() => {
              const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;
              Linking.openURL(url);
            }}>
              <Feather name='compass' color={'#FFA900'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.phone} onPress={() => {
              Linking.openURL(`tel:${restaurant.phone}`);
            }}>
              <Feather name='phone-call' color={'#FFA900'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  topImage: {
    width: '100%',
    height: 260,
  },
  heartContainer: {
    position: 'absolute',
    top: 15,
    right: 10,
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 5,
  },
  uploadContainer: {
    position: 'absolute',
    top: 15,
    right: 50,
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 5,
  },
  detailsContainer: {
    position: 'absolute',
    top: 230,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  detailsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    position: 'absolute',
    top: -50,
    right: 10,
    margin: 10,
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 20
  },
  rating: {
    height: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 5
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewNumber: {
    height: 40,
    backgroundColor: '#FFA900',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  },
  reviewNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  addressContainer: {
    marginTop: 20,
    backgroundColor: 'white'
  },
  addressText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9E9E9E'
  },
  distance: {
    flexDirection: 'row',
    marginTop: 5
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9E9E9E'
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'Ubuntu-Regular',
    color:'#9e9e9e',
   },
   type: {
     flexDirection: 'row',
     marginTop: 5
   },
   typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9E9E9E'
  },
  openType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000'
  },
  openButton: {
    marginLeft: 10,
    backgroundColor: '#7DEF37',
    paddingHorizontal: 10,
    borderRadius: 10
  },
  twoButton: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  map: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 75,
    borderRadius: 15,
    borderRadius: 15,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  phone: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 75,
    borderRadius: 15,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export default InfoCard