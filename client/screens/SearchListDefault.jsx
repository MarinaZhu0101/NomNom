import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import SearchTop from '../Components/SearchTop'
import FilterBar from '../Components/FilterBar'
import RestaurantCard from '../Components/RestroCards'
import Feather from '@expo/vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';

function SearchListDefault({navigation}) {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Feather name="arrow-left" size={24} color="#9e9e9e" />
            <Text style={styles.normalText}>Back</Text>
      </TouchableOpacity>
      <SearchTop />
      <FilterBar  />
      <ScrollView style={styles.listCards}>
        <View style={styles.listCard}>
           <RestaurantCard layout='list' />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:16,
    marginVertical:10,
  },

  backButton:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:10,
    gap:5,
  },

  normalText: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    color: '#9e9e9e',
  },

  listCards:{
    marginTop:20,
  },

  listCard:{
    marginBottom:15,
  }
  
})

export default SearchListDefault