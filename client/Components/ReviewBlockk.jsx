import { View, Text ,StyleSheet,Image,  ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import {Feather, MaterialIcons} from '@expo/vector-icons'
import axios from 'axios';

function ReviewBlock({reviews = [], filterId, userReviews}){

    const [reviewsWithUserData, setReviewsWithUserData] = useState([]);

    // console.log("ReviewBlockk - reviews: ", reviews);

    useEffect(() => {
        // console.log('Reviews array:', reviews);
        // console.log('User Reviews:', userReviews);

        const fetchUserData = async (reviewsToProcess) => {
            if (!reviewsToProcess || reviewsToProcess.length === 0) return;

            try {
                const reviewsWithUsers = await Promise.all(
                    reviewsToProcess.map(async (review) => {
                        if (!review.userName || !review.avatar) {
                            const userResponse = await axios.get(`http://localhost:6868/auth/user/${review.user_id}`);
                            return {
                                ...review,
                                userName: userResponse.data.name,
                                avatar: userResponse.data.profile_image,
                            };
                        }
                        return review;
                    })
                );
                setReviewsWithUserData(reviewsWithUsers);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        if (userReviews && userReviews.length > 0) {
            fetchUserData(userReviews);
        } else if (reviews && reviews.length > 0) {
            fetchUserData(reviews);
        }
    }, [reviews, userReviews]);

    

    useEffect(() => {
        // console.log("Reviewblockk - reviewsWithUserData: ", reviewsWithUserData);
    })

    // const reviewData = [
    //     {
    //         id: '1',
    //         userName: 'Jenna Aubert',
    //         userDate: '1 month ago',
    //         rating: 3,
    //         avatar: 'https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg',
    //         tags: ['Dessert', 'Irish', 'Pub', 'Vibe'],
    //         comment: 'Not a big fan of Irish food, but I like the vibe in this pub. The portion was impressive.',
    //         photos: [
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCkom1wMfJJeGRc7rwJa-Rkwgk7TkhuuG9w&s',
    //             'https://media.cnn.com/api/v1/images/stellar/prod/160929101749-essential-spanish-dish-paella-phaidon.jpg?q=w_1900,h_1069,x_0,y_0,c_fill',
    //             'https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg'
    //         ],
    //         like: 7
    //     },
    //     {
    //         id: '2',
    //         userName: 'John Doe',
    //         userDate: '2 weeks ago',
    //         rating: 5,
    //         avatar: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
    //         tags: ['Service', 'Vibe'],
    //         comment: 'Great service and atmosphere! I would definitely come back.',
    //         photos: [
    //             'https://www.irishfoodwritersguild.ie/wp-content/uploads/2021/04/Banner2024_5_regan_organic_chicken.jpg',
    //             'https://images.ctfassets.net/awb1we50v0om/2Spf80TME2zIhLqsi3Zxv9/919421a45f3260ee426c99c35235f1c8/Plates03__3__copy3.jpg',
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRfpZB0_3qGRT0vx7Jlw662goIgQc9en4esg&s'
    //         ],
    //         like: 12
    //     },
    //     {
    //         id: '3',
    //         userName: 'Brian K',
    //         userDate: '21 days ago',
    //         rating: 4,
    //         avatar: 'https://cdn3.iconfinder.com/data/icons/avatar-set/512/Avatar01-512.png',
    //         tags: [],
    //         comment: 'The Irish stew reminds me of my mom cooking, cannot have it enough.',
    //         photos: [
    //         ],
    //         like: 13
    //     },
    //     {
    //         id: '4',
    //         userName: 'Cara',
    //         userDate: '1 month ago',
    //         rating: 3,
    //         avatar: 'https://images.unsplash.com/photo-1705147293093-5b6d9265726c?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //         tags: ['Dessert'],
    //         comment: 'Not a big fan of Irish food, but I like the vibe in this pub. The portion was impressive.',
    //         photos: [
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCkom1wMfJJeGRc7rwJa-Rkwgk7TkhuuG9w&s',
    //             'https://media.cnn.com/api/v1/images/stellar/prod/160929101749-essential-spanish-dish-paella-phaidon.jpg?q=w_1900,h_1069,x_0,y_0,c_fill',
    //             'https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg'
    //         ],
    //         like: 7
    //     },
    //     {
    //         id: '5',
    //         userName: 'Cara',
    //         userDate: '21 days ago',
    //         rating: 4,
    //         avatar: 'https://images.unsplash.com/photo-1705147293093-5b6d9265726c?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //         tags: [],
    //         comment: 'The Irish stew reminds me of my mom cooking, cannot have it enough.',
    //         photos: [
    //         ],
    //         like: 13
    //     },
    // ]

    // console.log("review_info", review_info);

    // const filteredData = reviews
    // ? (filterId ? reviewsWithUserData.filter((review) => review.id === filterId) : reviewsWithUserData)
    // : userReviews;
    const filteredData = filterId
    ? reviewsWithUserData.filter((review) => review.id === filterId)
    : reviewsWithUserData;

    // console.log("ReviewBlockk - filteredData: ", filteredData);

    // const filteredReviews = review_info.filter(review => review.restaurant_id === restaurant_info);

    // let filteredData = reviewData;
    // if (filterId) {
    //     filteredData = filteredData.filter(review => review.id === filterId);
    // }
    
    // if (filterName) {
    //     filteredData = filteredData.filter(review => review.userName.toLowerCase().includes(filterName.toLowerCase()));
    // }
    
    return(
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
    {filteredData.map((review, index)=>(
           <View key={review.id || index} style={styles.reviewCard}>
           <View style={styles.avatar}>
               <Image source={{uri:review.avatar}} style={styles.avatarImage} />
               <View style={styles.nameDate}>
                   <Text style={styles.userName}> {review.userName}</Text>
                   <Text style={styles.userDate}> {new Date(review.review_date).toLocaleDateString()}</Text>
               </View>
               <View style={styles.commentStar}>
                   {Array.from({ length: 5 }, (_, index) => (
                       <MaterialIcons
                           key={index}
                           name="star"
                           size={15}
                           color={index < review.rating ? "#FFB300" : "#EEEEEE"}
                           style={styles.starIcon}
                       />
                   ))}
               </View>
           </View>
           {/* <View style={styles.tagBar}>
               {review.features.map((tag, index)=> (
                   <View key={index} style={styles.tag}>
                       <Text style={styles.tagText}>{tag}</Text>
                   </View>
               ))}
           </View> */}
           <View style={styles.comment}>
               <Text style={styles.commentText}>
                   {review.text}
               </Text>
           </View>
           <View style={styles.photo}>
               {review.photos.map((photoUri, index)=>(
                   <Image key={index} source={{uri:photoUri}} style={styles.photoImage}/>
               ))}
           </View>
           <View style={styles.like}>
               <Feather name = "thumbs-up" size={20}/>
               <Text style={styles.likeNumber}>{review.helpful.length}</Text>
           </View>
       </View>
    ))}
    </ScrollView>
    )
}


const styles = StyleSheet.create({
  reviewCard: {
      borderRadius: 15,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 6,
      marginBottom: 10,
      marginHorizontal:5
  },
  avatar:{
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 10,
      marginHorizontal: 15
  },
  avatarImage: {
      width: 50,
      height: 50,
      borderRadius: 50
  },
  nameDate: {
      paddingLeft: 10,
      paddingTop: 5
  },
  userName:{
      fontFamily:'Ubuntu-Medium',
      fontSize: 16
  },
  userDate: {
      color: '#9E9E9E',
      fontFamily:'Ubuntu-Medium',
  },
  commentStar: {
      flexDirection: 'row',
      paddingLeft: 60,
      paddingTop: 8
  },
  starIcon: {
      paddingRight: 4
  },
  tagBar: {
      flexDirection: 'row',
      paddingVertical: 5,
      paddingLeft: 15,
    },
  tag: {
      backgroundColor: 'white',
      fontSize: 9,
      borderWidth: 1,
      borderColor: '#FFB300',
      paddingVertical: 4,
      paddingHorizontal: 15,
      borderRadius: 15,
      marginRight: 5,
    },
    tagText: {
      fontSize: 12,
      fontFamily: 'Ubuntu-Regular',
      color:'#6e6e6e'
    },
  comment: {
      paddingHorizontal: 18,
      paddingVertical: 10
  },
  commentText: {
      fontSize: 14,
      color: '#6E6E6E',
      fontWeight: '500'
  },
  photo: {
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 2,
      justifyContent: 'center'
  },
  photoImage: {
      width: 105,
      height: 100,
      borderRadius: 10,
      marginRight: 5
  },
  like: {
      flexDirection: 'row',
      paddingLeft:290,
      marginVertical:15,
  },
  likeNumber: {
      paddingLeft: 5,
      paddingTop: 2
  }
  
  })

export default ReviewBlock