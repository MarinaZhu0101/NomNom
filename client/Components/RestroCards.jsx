import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Button, ScrollView, SafeAreaView, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { Link } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { RestaurantContext } from '../Context/RestaurantContext';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateAveragePrice } from '../utils/AvgPrice';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = { fontFamily: 'Ubuntu-Regular' };


const RestaurantCard = ({ restaurant, layout = 'default', onRemove }) => {
    const { user, setUser } = useContext(AuthContext);
    const [averagePrice, setAveragePrice] = useState(null);

    const id = restaurant?._id || " ";
  
    const name = restaurant?.name || "Fiction Bistro";
    const rating = restaurant?.rating || "4.99";
    const address = restaurant?.address_obj?.street1 || "Walden Lake, D19";
    const cuisine = restaurant?.cuisine?.map(c => c.localized_name).slice(0, 3).join(', ') || "Irish";
    const distance = restaurant?.distance || "3.5 km";
    const price = restaurant?.price_level || "€200";
    const image = restaurant?.image?.[0]?.url || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    const totalReviews = restaurant?.review_rating_count
        ? Object.values(restaurant.review_rating_count).reduce((sum, count) => sum + parseInt(count), 0)
        : 0;

    // console.log("layout: ", layout);

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

  if (!restaurant) {
    return <Text>Loading restaurant information...</Text>;
  }

    const navigation = useNavigation();

    const handlePressToRestro = useCallback(() => {
        // console.log("Navigating with restaurantId:", restaurant._id);
        if (restaurant && restaurant._id) {
            navigation.navigate('RestaurantDetail', {
                screen: 'RestaurantTabs',
                params: { screen: 'overview', restaurantId: restaurant._id }
            });
        } else {
            console.error('Invalid restaurant data');
        }
    }, [navigation, restaurant]);

    // const isFavourite = user?.favouriteRestaurant.includes(id);
    // const [isPressed, setIsPressed] = useState(isFavourite);

    const handleToMenu = useCallback(() => {
        // console.log("Navigating to menu with restaurantId:", restaurant._id);
        if (restaurant && restaurant._id) {
            navigation.navigate('RestaurantDetail', {
                screen: 'RestaurantTabs',
                params: { screen: 'menu', restaurantId: restaurant._id }
            });
        } else {
            console.error('Invalid restaurant data');
        }
    }, [navigation, restaurant]);

    useEffect(() => {
        if (user && user.favouriteRestaurant) {
            setIsPressed(user.favouriteRestaurant.includes(id));
        }
    }, [user, id]);

    const toggleFavourite = async () => {
        const action = isPressed ? 'remove' : 'add';
        console.log(`Action: ${action}, UserId: ${user.id}, RestaurantId: ${id}`);

        try {
            const response = await fetch(`http://localhost:6868/auth/user/${user.id}/favourites/restaurant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
                },
                body: JSON.stringify({ userId: user.id, restaurantId: id, action })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to ${action === 'add' ? 'add to' : 'remove from'} favourites: ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            const updatedUser = { ...user, favouriteRestaurant: data.favourite_restaurant };
            setUser(updatedUser);
            setIsPressed(!isPressed);

            // If the restaurant is being removed, call the onRemove callback to update the parent state
            if (action === 'remove' && layout === 'default' && onRemove) {
                onRemove(id);
            }
        } catch (error) {
            console.error(`Error ${action === 'add' ? 'adding to' : 'removing from'} favourites:`, error);
        }
    };

    const renderContent = () => {
        switch (layout) {
            // for home page and liked
            case 'default':
                return (
                    <TouchableOpacity style={[styles.homeCard, styles.shadowSubtle]} onPress={handlePressToRestro} >
                        <Image source={{ uri: image }} style={styles.homeImage} />


                        <View style={styles.homeRatingContainer}>
                            <Ionicons name="star" size={20} color="#FFB300" />
                            <Text style={styles.ratingText}>{rating}</Text>
                        </View>


                        <TouchableOpacity
                            onPress={toggleFavourite}
                            activeOpacity={1}
                            style={styles.likeButton}>
                            <Ionicons
                                name={isPressed ? "heart" : "heart-outline"}
                                size={24}
                                color={isPressed ? '#E65100' : "#fff"} />
                        </TouchableOpacity>

                        <View style={styles.homeInfo}>
                            <View style={styles.homeKeyInfo}>
                                <Text style={styles.restaurantName}>{name}</Text>
                                <TouchableOpacity style={styles.menuButton} onPress={handleToMenu}>
                                    <Feather name="pocket" size={16} color="#fff" />
                                    <Text style={styles.menuButtonText}>Menu</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.homeContainer}>
                                <View style={styles.flexRow}>
                                    <Feather name="map-pin" size={16} color="#E65100" />
                                    <Text style={styles.smallText}>{address}</Text>
                                </View>
                                <Text style={styles.smallText}>{distance}</Text>
                            </View>

                            <View style={styles.homeContainer}>
                                <View style={styles.flexRow}>
                                    <MaterialCommunityIcons name="bowl-mix-outline" size={18} color="#E65100" />
                                    <Text style={styles.smallText}>{cuisine}</Text>
                                </View>
                                <Text style={styles.smallText}>Avg. {price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            // for search result list
            case 'list':
                return (
                    <TouchableOpacity style={styles.listCard} onPress={handlePressToRestro} >
                        <Image source={{ uri: image }} style={styles.listImage} />

                        <View style={styles.listInfo}>
                            <View style={styles.KeyInfo}>
                                <Text style={styles.listRestName}>{name}</Text>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={16} color="#FFB300" />
                                    <Text style={styles.smallText}>{rating}</Text>
                                </View>
                            </View>
                            <View style={styles.smallContainer}>
                                <Feather name="map-pin" size={16} color="#FFB300" />
                                <Text style={styles.tinyText}>{address}</Text>
                            </View>

                            <View style={styles.smallContainer}>
                                <MaterialCommunityIcons name="bowl-mix-outline" size={18} color="#FFB300" />
                                <Text style={styles.tinyText}>{cuisine}</Text>
                            </View>

                            <Text style={styles.tinyText}>{distance} · Avg {price}</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.detailsButton} onPress={handlePressToRestro}>
                                    <Text style={styles.detailsButtonText}>Details</Text>
                                    <Feather name="arrow-up-right" size={20} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuButton} onPress={handleToMenu}>
                                    <Text style={styles.menuButtonText}>Menu</Text>
                                    <Feather name="pocket" size={16} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                );

            // for surprise me page
            case 'surprise':
                return (
                    <TouchableOpacity style={styles.surpriseCard} onPress={handlePressToRestro} >
                        <Image
                            source={{ uri: image }}
                            style={styles.surpriseImage}
                        />

                        <View style={styles.surpriseContent}>
                            <View style={styles.KeyInfo}>
                                <Text style={styles.restaurantName}>{name}</Text>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={18} color="#FFB300" />
                                    <Text style={styles.ratingText}>{rating}</Text>
                                </View>
                            </View>

                            <Text style={styles.mediumText}>{distance} · Avg {price}</Text>

                            <View style={styles.smallContainer}>
                                <Feather name="map-pin" size={16} color="#FFB300" />
                                <Text style={styles.smallText}>{address}</Text>
                            </View>

                            <View style={styles.smallContainer}>
                                <MaterialCommunityIcons name="bowl-mix-outline" size={18} color="#FFB300" />
                                <Text style={styles.smallText}>{cuisine}</Text>
                            </View>

                            <TouchableOpacity style={styles.detailsButton} onPress={handlePressToRestro}>
                                <Text style={styles.detailsButtonText}>Details</Text>
                                <Feather name="arrow-up-right" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                );
            default:
                return null;
        }
    };

    return <View style={styles.container}>{renderContent()}</View>;
};


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const shadowSubtle = Platform.select({
    ios: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    android: {
        elevation: 5,
    },
});

const styles = StyleSheet.create({
    // default
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // width:'100%',
        // height:'100%',

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

    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        marginBottom: 5,
    },

    restaurantName: {
        color: '#221C19',
        fontSize: 22,
        fontFamily: 'Ubuntu-Bold',
        wordWrap: 'break-word',
    },

    shadowSubtle: shadowSubtle,

    homeCard: {
        width: windowWidth * 0.85,
        height: 250,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 10
    },

    homeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },

    homeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },

    homeRatingContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 10,
        zIndex: 1,
    },

    ratingText: {
        color: '#fff',
        marginLeft: 5,
        fontFamily: 'Ubuntu-Regular',
    },

    likeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.40)',
        padding: 5,
        borderRadius: 30,
    },

    topLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    homeInfo: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
    },

    homeKeyInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },

    menuButton: {
        flexDirection: 'row',
        backgroundColor: '#536DFE',
        width: 80,
        height: 25,
        padding: 2,
        borderRadius: 20,
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Ubuntu-Regular',
    },

    /// List Card layout

    listCard: {
        width: windowWidth * 0.9,
        height: 150,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 10
    },

    listImage: {
        height: 150,
        width: 135,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },

    buttonContainer: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 10,
    },

    listInfo: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 10,
    },

    listRestName: {
        fontSize: 20,
        flex: 1,
        marginRight: 8,
        fontFamily: 'Ubuntu-Bold',
    },

    tinyText: {
        fontSize: 11,
        color: '#6E6E6E',
        paddingLeft: 2,
        fontFamily: 'Ubuntu-Regular',
    },

    ////Surprise Card layout
    surpriseCard: {
        flexDirection: 'column',
        width: windowWidth * 0.8,
        height: windowHeight * 0.55,
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
    },
    surpriseImage: {
        width: '100%',
        height: '55%',
        resizeMode: 'cover',
        borderBottomLeftRadius: 20,
    },

    surpriseContent: {
        padding: 30,
        justifyContent: 'center',
    },

    KeyInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    ratingText: {
        paddingLeft: 3,
        fontSize: 16,
        color: '#6E6E6E',
        fontFamily: 'Ubuntu-Regular',
    },

    mediumText: {
        fontSize: 16,
        fontFamily: 'Ubuntu-Regular',
        color: '#6e6e6e',
        marginBottom: 10,
    },

    smallText: {
        fontSize: 14,
        color: '#6E6E6E',
        paddingLeft: 2,
        fontFamily: 'Ubuntu-Regular',
    },

    smallContainer: {
        flexDirection: 'row',
        gap: 2,
        marginBottom: 8,
        width: '70%',
        alignItems: 'center',
    },

    detailsButtonText: {
        color: 'white',
        fontFamily: 'Ubuntu-Regular',
    },

    detailsButton: {
        flexDirection: 'row',
        backgroundColor: '#E65100',
        borderRadius: 20,
        width: 80,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    }
});

export default RestaurantCard;