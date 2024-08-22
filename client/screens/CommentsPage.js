import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent, ScrollView,KeyboardAvoidingView, Platform} from "react-native"
import { useEffect, useState, useContext} from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import RatingThree from "../Components/RatingThree";
import TagsCard from "../Components/TagsCard";
import ImagePickerOne from "../Components/ImagePicker";
import InputComments from "../Components/InputComments";
import BackButton from "../Components/BackButton";
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CommentsPage = () => {
    const navigation = useNavigation(); 
    const route = useRoute();
    const { user } = useContext(AuthContext);
    const restaurantId = route.params?.restaurantId;
    const [selectedRating, setSelectedRating] = useState(null);
    const [comments, setComments] = useState(''); 
    const [image, setImage] = useState(null); 
    const [tags, setTags] = useState([]);  
    const [ratingDetails, setRatingDetails] = useState({ taste: '', authenticity: '', ambience: '' }); 

    const selectRating = (rating) => {
        setSelectedRating(rating);
    };

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => selectRating(i)}>
                    {i <= selectedRating ? 
                    <MaterialIcons                                 
                        name="star"
                        size={45}
                        color={"#FFB300" }/>
                    : <MaterialIcons
                        name="star-border" 
                        size={45} 
                        color={"#9E9E9E"}/>
                    }
                </TouchableOpacity>
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };

    // const handleSubmit = () => {
    //     navigation.navigate("EndComments");
    // };
    const handleSubmit = async () => {
        if (!user) {
            alert('Please log in to submit a review.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

            const reviewData = {
                user_id: user.id,
                restaurant_id: restaurantId,
                rating: selectedRating,
                text: comments,
                review_date: new Date(),
                features: tags,
                photos: image ? [image] : [],
                rating_details: ratingDetails
            };

            const response = await axios.post(`http://localhost:6868/reviews/restaurant/${restaurantId}`, reviewData, {
                method: 'POST',
                headers: {
                    ...authHeader,
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                console.log('Review submitted successfully')
                navigation.navigate('EndComments');
            } else {
                alert("Failed to submit review.");
                const errorData = await response.json();
                console.error('Failed to submit review:', errorData);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert("Error submitting review.");
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.inner} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={50}
            >
            <BackButton  />
            <ScrollView>
            <View style={styles.TopRatingContainer}>
                <Text style={styles.TopRatingText}>Rate your overall experience</Text>
                {renderStars()}
            </View>
            <View style={styles.commentCardContainer}>
                <RatingThree ratingDetails={ratingDetails} setRatingDetails={setRatingDetails}/>
                <TagsCard tags={tags} setTags={setTags}/>
                <ImagePickerOne image={image} setImage={setImage}/>
                <InputComments comments={comments} setComments={setComments}/>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner:{
        flex: 1
    },
    TopRatingContainer:{
        marginTop: 30,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TopRatingText:{
        fontFamily: 'Ubuntu_Bold',
        fontSize: 16,
        paddingBottom: 5
    },
    starsContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    commentCardContainer:{
        backgroundColor: 'white',
        marginHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        shadowColor: 'rgb(200,200,200)',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity:'0.5',
        shadowRadius: 3,
    },
    submitButton:{
        marginTop: 15,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: '#FFB300',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    submitText:{
        fontSize: 14,
        fontFamily: 'Ubuntu_Bold'
    }
})

export default CommentsPage
