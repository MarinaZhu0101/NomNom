import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, Platform, Linking, SafeAreaView, Animated } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocation } from '../Context/UserLocation';
import RestaurantCard from '../Components/RestroCards';
import Ionicons from '@expo/vector-icons/Ionicons';
import { calculateDistance, addDistanceToRestaurants } from '../utils/distance';
import SearchTop from '../Components/SearchTop';
import FilterBar from '../Components/FilterBar';
import { calculateAveragePrice } from '../utils/AvgPrice';
import { getFlagImage } from '../utils/flags';

export default function GoogleMapsView({ navigation, route }) {
  const [mapRegion, setMapRegion] = useState(null);
  const { location } = useContext(UserLocation);
  const [selectedRestro, setSelectedRestro] = useState(null);
  const mapRef = useRef(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonPosition] = useState(new Animated.Value(20)); 

  useEffect(() => {
    Animated.timing(buttonPosition, {
      toValue: selectedRestro ? 180 : 20,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selectedRestro]);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
    }
  }, [location]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:6868/restaurants');
        const restaurantsWithDistance = addDistanceToRestaurants(response.data, location);
        
        const restaurantsWithPricesAndTopDish = await Promise.all(restaurantsWithDistance.map(async (restaurant) => {
          const averagePrice = await calculateAveragePrice(restaurant._id);
          const menuResponse = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurant._id}`);
          const menus = menuResponse.data;
          
          let topDish = null;
          if (menus.length > 0) {
            const menuId = menus[0].menu_id;
            const dishesResponse = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`);
            const dishes = dishesResponse.data;
            if (dishes.length > 0) {
              topDish = dishes.reduce((prev, current) => 
                (parseFloat(prev.rating) > parseFloat(current.rating)) ? prev : current
              );
            }
          }
          
          return { ...restaurant, averagePrice, topDish: topDish ? topDish.name : 'Not available' };
        }));

        setRestaurants(restaurantsWithPricesAndTopDish);
      } catch (error) {
        setError('Error fetching restaurant data');
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [location]);

  const CustomMarker = ({ cuisine, averagePrice, rating, isSelected }) => {
    const flagImage = getFlagImage(cuisine);
    return (
      <View style={styles.markerContainer}>
        <Image
          source={flagImage}
          style={styles.flagImage}
        />
        <View style={[
            styles.markerSubContainer,
            isSelected ? styles.selectedMarker : null
          ]}>
            <Text style={styles.markerText}>€{averagePrice} ⭐️ {rating}</Text>
          </View>
      </View>

    );
  };

  const handleMarkerPress = (event, restaurant) => {
    event.stopPropagation(); 
    setSelectedRestro(restaurant);
  };

  const handleMapPress = (event) => {
    if (event.nativeEvent.action !== 'marker-press') {
      setSelectedRestro(null);
    }
  };

  const toUserLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      })
    }
  };

  if (loading){
    return <View style={styles.container}><Text>Loading Restaurants...</Text></View>
  }

  const navToRestaurant = () => {
    if (selectedRestro) {
      const scheme = Platform.select({ios: 'maps:0,0?q=', android:'geo:0,0?q='});
      const latLng = `${selectedRestro.latitude},${selectedRestro.longitude}`;
      const label = selectedRestro.name;
      const url = Platform.select({
        ios:`${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
  
      Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBlock}>        
        <SearchTop  />
        <FilterBar  />
      </View>
    
      <MapView 
        style={styles.map} 
        showsUserLocation={true}
        region={mapRegion}
        ref={mapRef}
        onPress={handleMapPress}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant._id}
            coordinate={{
              latitude: parseFloat(restaurant.latitude),
              longitude: parseFloat(restaurant.longitude)
            }}
            onPress={(event) => handleMarkerPress(event,restaurant)}
          >
            <CustomMarker
              rating={restaurant.rating} 
              cuisine={restaurant.cuisine}
              averagePrice={restaurant.averagePrice || 'N/A'} 
              isSelected={selectedRestro && selectedRestro._id === restaurant._id}
            />
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{restaurant.name}</Text>
                <Text style={styles.calloutText}>Top Dish: {restaurant.topDish}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      
      <Animated.View style={[styles.controlButtons, { bottom: buttonPosition }]}>
        <TouchableOpacity style={styles.controlButton} onPress={toUserLocation}>
          <Ionicons name="locate" size={24} color="#9e9e9e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={navToRestaurant}>
          <Ionicons name="navigate-outline" size={24} color="#9e9e9e" />
        </TouchableOpacity>
      </Animated.View>

      {selectedRestro && (
        <View style={styles.card}>
          <RestaurantCard 
            layout='list'
            restaurant={selectedRestro} />
        </View>
      )}
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height:windowHeight,
    backgroundColor:'#fff',
  },

  calloutContainer:{
    width: 180,
    borderRadius:10,
    padding:10,
    backgroundColor:'#fff',
    marginBottom:-10,
    borderColor: '#FFB300',
    borderWidth:2,
  },

  calloutTitle:{
    fontFamily:'Ubuntu-Medium',
    fontSize:16,
    marginBottom:5,
    color: '#000',
  },

  calloutText:{
    fontFamily:'Ubuntu-Regular',
    fontSize:12,
    color: '#000',
  },

  card:{
    position:'absolute',
    bottom:20,
    left:16,
    right:16,
  },

  cardTitle:{
    fontSize: 18,
    fontFamily:'Ubuntu-Bold',
    marginBottom:5,
  },

  map: {
    width: windowWidth,
    height: windowHeight,
    padding: 10,
  },

  searchBlock:{
    paddingHorizontal:16,
    marginTop:15,
    marginBottom:6,
    gap:6,
  },

  controlButtons: {
    position: 'absolute',
    right: 16,
    flexDirection: 'column',
  },

  controlButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  flagImage: {
    height: 36,
    elevation: 1,
    shadowColor: "#FFB300",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },

  goToUser:{
    position:'absolute',
    right:16,
    bottom:'35%',
    padding: 10,
    borderRadius:30,
    elevation:5,
    backgroundColor:"#fff",
  },

  navToRestro:{
    // position:'absolute',
    right:16,
    bottom:'27%',
    padding: 10,
    borderRadius:30,
    elevation:5,
    backgroundColor:"#fff",
  },

  markerSubContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 24,
    paddingHorizontal:6,
    minWidth: 70,
    borderColor:'#FFB300',
    borderRightWidth:2,
    borderBottomWidth:2,
  },

  markerContainer: {
    flexDirection:'row',
    padding: 8,
    alignItems:'center',
  },

  selectedMarker: {
    backgroundColor: '#FFB300',
  },

  markerText: {
    color: '#221C19',
    fontFamily:'Ubuntu-Regular',
    fontSize: 12,
  },

  calloutBox:{
    alignItems: 'center',
    justifyItems: 'center',
  }
});