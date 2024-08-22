import React from 'react';
import { View, Text, ScrollView, StyleSheet,Image, TouchableOpacity} from 'react-native';
import {MaterialIcons, Feather} from '@expo/vector-icons'
import PopDishes from './PopDishes';

const PhotoCard = () => {
  return (
    <View style={styles.photosContainer}>
    <View style={styles.photosTop}>
        <View style={styles.photosTopLeft}>
            <Feather name='image' color={'#E65100'} size={25}/>
            <Text style={styles.leftText}>Photos</Text>
        </View>
        <View style={styles.photosTopRight}>
            <Text style={styles.rightText}>View All</Text>
            <Feather name='arrow-right' color={'#9E9E9E'} size={18}/>
        </View>
    </View>
    <View style={styles.photosBottom}>
        <View style={styles.photosLeft}>
            <Image source={{uri: 'https://www.aixenprovencetourism.com/wp-content/uploads/2013/07/ou_manger-1920x1080.jpg'}} style={styles.photoOne}/>
            <Image source={{uri: 'https://glasrestaurant.ie/wp-content/uploads/2022/08/GlasSelects-5b.jpg'}} style={styles.photoTwo}/>
        </View>
        <View style={styles.photosMiddle}>
            <Image source={{uri: 'https://media.istockphoto.com/id/1081422898/photo/pan-fried-duck.jpg?s=612x612&w=0&k=20&c=kzlrX7KJivvufQx9mLd-gMiMHR6lC2cgX009k9XO6VA='}} style={styles.photoThree}/>
        </View>
        <View style={styles.photosRight}>
            <Image source={{uri: 'https://www.moma.org/d/p/sa/8-14-23_Restaurant-Header_Final.jpg'}} style={styles.photoFour}/>
            <Image source={{uri: 'https://skygarden.london/wp-content/uploads/2023/01/Larch-Tasting-0084-1-3840x2160.jpg'}} style={styles.photoFive}/>
        </View>
    </View>
</View>
  );
};

const styles = StyleSheet.create({
  photosContainer:{
    marginTop: 20,
    marginHorizontal: 3
   },
   photosTop: {
    flexDirection: 'row',
    justifyContent: 'space-between'
   },
   photosTopLeft: {
    flexDirection: 'row'
   },
   photosTopRight: {
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
   photoOne: {
    width: 74,
    height: 54,
    borderRadius: 5
   },
   photoTwo: {
    width: 74,
    height: 54,
    borderRadius: 5
   },
   photoThree: {
    width: 180,
    height: 118,
    borderRadius: 5
   },
   photoFour: {
    width: 74,
    height: 54,
    borderRadius: 5
   },
   photoFive: {
    width: 74,
    height: 54,
    borderRadius: 5
   },
   photosBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10
   },
   photosLeft: {
    justifyContent: 'space-between',
   },
   photosRight:{
    justifyContent: 'space-between',
   }
   
});

export default PhotoCard;