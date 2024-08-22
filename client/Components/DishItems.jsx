import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Feather, MaterialIcons} from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Context/AuthContext';

const DishItem = ({dishId, name, price, description, rating}) => {
    const { user, setUser } = useContext(AuthContext);

    const isFavourite = user?.favouriteDish.includes(dishId);
    const [isPressed, setIsPressed] = useState(isFavourite);

    const [ratingVisible, setRatingVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);

    const toggleFavourite = async () => {
        const action = isPressed ? 'remove' : 'add';
    
        try {
          const response = await fetch(`http://localhost:6868/auth/user/${user.id}/favourites/dish`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
            },
            body: JSON.stringify({ userId: user.id, dishId, action })
          });
    
          if (!response.ok) {
            throw new Error(`Failed to ${action === 'add' ? 'add to' : 'remove from'} favourites`);
          }
    
          const data = await response.json();
          const updatedUser = { ...user, favouriteDish: data.favourite_dish };
          setUser(updatedUser);
          setIsPressed(!isPressed);
        } catch (error) {
          console.error(`Error ${action === 'add' ? 'adding to' : 'removing from'} favourites:`, error);
        }
      };
    

    const toggleRatingVisibility = () => {
        setRatingVisible(!ratingVisible);
    };

    const selectRating = (rating) => {
        setSelectedRating(rating);
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => selectRating(i)}>
                    <MaterialIcons
                        name="star"
                        size={30}
                        color={i <= selectedRating ? "#FFB300" : "#9e9e9e"}
                    />
                </TouchableOpacity>
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };

    return (
    <TouchableOpacity onPress={toggleRatingVisibility}>
    <View style={styles.dishContainer}>
        <View style={styles.dishTop}>
            <View style={styles.dishName}>
                <Text style={styles.dishNameText}>{name}</Text>
            <TouchableOpacity onPress={toggleFavourite} style={styles.heartIcon}>
             <Ionicons 
                name = {isPressed ? "heart":"heart-outline"} 
                size={15} 
                color={isPressed ? '#E65100':"grey" }/>
          </TouchableOpacity>
            </View>
            <View style={styles.dishPrice}>
                <Text style={styles.dishPriceText}>€ {price}</Text>
            </View>
        </View>
        <View style={styles.dishMiddle}>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>
        </View>
        <View style={styles.dishBottom}>
            <View style={styles.dishRate}>
                <MaterialIcons name="star" size={15} color="#FFB300" />
                <Text style={styles.dishRateText}>{rating}</Text>
                <Feather name="chevron-right" size={15} color="#FFB300" />
            </View>
        </View>
    </View>
  
        {ratingVisible && renderStars()}


    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    dishContainer:{
        flexDirection:'column',
        justifyContent:'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
        marginBottom: 10
    },
    dishTop:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dishName:{
        flexDirection: 'row',
    },
    dishNameText:{
        fontSize: 14,
        fontFamily:'Ubuntu-Medium',
        paddingRight: 10,
        paddingBottom:5,
    },
    heartIcon:{
        paddingTop: 1,
        backgroundColor:'rgba(255, 255, 255, 0.40)',
        padding: 2, 
        borderRadius: 15
    },
    dishPriceText: {
        fontSize: 14,
        fontFamily:'Ubuntu-Medium',
        paddingRight: 5
      },
    dishMiddle: {
        width: '80%'
      },
    descriptionText: {
        fontSize: 14,
        color: 'grey',
    },
    dishBottom: {
       flexDirection: 'row',
       justifyContent: 'flex-end',
    },
    dishRate: {
        flexDirection: 'row'
    },
    dishRateText: {
        fontSize: 11,
        color:'#9E9E9E',
        fontFamily:'Ubuntu-Medium',
        paddingLeft: 2,
        paddingRight: 3
    },

    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#e8e8e8',
        marginHorizontal: 15,
        marginBottom:10,
        marginTop:-10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
})

export default DishItem