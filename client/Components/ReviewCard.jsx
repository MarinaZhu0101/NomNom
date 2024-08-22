import React, {useContext, useEffect, useState} from 'react';
import { View, Text,StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Feather} from '@expo/vector-icons';
import ReviewBlock from './ReviewBlockk';
import { AuthContext } from '../Context/AuthContext';

const tags = ['Fresh', 'BBQ', 'Date', 'Family', 'Spicy', 'Vibe']

const ReviewCard = (restaurant) => {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Restaurant ID:', restaurant?.id);
    const fetchRestaurantReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:6868/reviews/restaurant/${restaurant.id}`);
        console.log('Fetched reviews:', response.data); 
        setReviews(response.data);
      } catch (error) {
        setError('Error fetching restaurant reviews');
      } finally {
        setLoading(false);
      }
    };

    if (restaurant?.id) {
      fetchRestaurantReviews();
    }
  }, [restaurant?.id]);
    
  if (loading) {
    return (
      <View style={[styles.loadingContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FFC93C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }
      
  return (
    <View style={styles.reviewSection}>
        <View style={styles.reviewTop}>
            <View style={styles.reviewTopLeft}>
                <Feather name='message-circle' color={'#E65100'} size={25}/>
                <Text style={styles.leftText}>Reviews</Text>
            </View>
            <View style={styles.reviewTopRight}>
                <Text style={styles.rightText}>View All</Text>
                <Feather name='arrow-right' color={'#9E9E9E'} size={18}/>
            </View>
        </View>
        <View style={styles.reviewTag}>
            {tags.map((item,index)=> (
                <View  key={index} style={styles.tagContainer}>
                    <Text style={styles.tagText}>{item}</Text>
                </View>
            ))}
        </View>
        <View Style={styles.reviewsContainer}>
            <ReviewBlock filterId='1' reviews={reviews}/>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
    reviewSection: {
        flex: 1,
        marginHorizontal: 5,
        marginVertical: 10,
        justifyContent: 'center',
        alignContent: 'center'
    },
    reviewTop: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reviewTopLeft: {
        flexDirection: 'row'
    },

    reviewTopRight: {
        flexDirection: 'row'
    },

    leftText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 5,
        marginTop: 2
    },

    rightText: {
        color: '#9E9E9E',
        fontsize: 12,
    },

    reviewTag:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 15,
        marginHorizontal: 10,
    },

    tagContainer: {
        backgroundColor:'white',
        marginRight: 10,
        marginBottom: 10,
        paddingHorizontal: 18,
        paddingVertical: 2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#6e6e6e',
    },

    tagText:{
        color: '#6e6e6e'
    },

});

export default ReviewCard;