import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext, useMemo } from "react";
import SearchTop from '../Components/SearchTop'
import FilterBar from '../Components/FilterBar'
import RestaurantCard from '../Components/RestroCards'
import Feather from '@expo/vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import DishCard from "../Components/DishCards";
import { SearchContext } from '../Context/SearchContext';

function SearchList({ navigation, route }) {
    const { restaurant, dishData, type } = route.params; // Access the passed data and query from route.params
    // console.log(route.params);
    // console.log("SearchList - restaurant: ", restaurant[0].cuisine);
    // console.log("SearchList - dishData: ", dishData);
    // const [query, setQuery] = useState('');
    const { searchQuery, setSearchQuery } = useContext(SearchContext);


    // const results_cuisine = (type === 'restro' ? restaurant : dishData).filter(r => r.name.toLowerCase().includes(searchQuery));

    // const results = (type === 'restro' ? restaurant : dishData).filter(r => r.name.toLowerCase().includes(searchQuery));
    // console.log("r", results);

    const results = (type === 'restro' ? restaurant : dishData).filter(r => {
        // Check if the name matches the search query
        const nameMatch = r.name.toLowerCase().includes(searchQuery.toLowerCase());

        // if (type === 'restro') {
        //     console.log("r:", r);
        // Check if the cuisine array contains any element that matches the search query
        const cuisineMatch = r.cuisine && r.cuisine.some(cuisineItem =>
            cuisineItem.localized_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        // }
        // Return true if either the name or any cuisine item matches the search query

        if (type === "restro") {
            return nameMatch || cuisineMatch;
        } else {
            const descriptMatch = r.description.toLowerCase().includes(searchQuery.toLowerCase());
            return nameMatch || cuisineMatch || descriptMatch;
        }
    });

    console.log("SearchList - results: ", results);

    let resultsComp = results.map((result, index) => (
        type === 'restro' ? (<RestaurantCard
            key={index}
            layout='list'
            restaurant={result}
        />) : (<DishCard
            key={index}
            layout='list'
            dish={result}
            restaurant={result.restaurant}
        />
        )))


    // console.log(data);
    // console.log(results);
    // {data.map((restaurant, index) => (
    // type === 'restro' ? (<RestaurantCard
    // key={index}
    // layout='list'
    // restaurant={restaurant}
    // />) : (<DishCard
    // key={index}
    // layout='list'
    // dish={restaurant}
    // restaurant={restaurant.restaurant}
    // />
    // )
    // ))}

    // console.log("SearchList - type: ", type);

    // console.log("SearchList - data: ", data[0].name);

    const handleBack = () => {
        navigation.goBack();
    };

    // return (
    // <SafeAreaView style={styles.container}>
    // <TouchableOpacity style={styles.backButton} onPress={handleBack}>
    // <Feather name="arrow-left" size={24} color="#9e9e9e" />
    // <Text style={styles.normalText}>Back</Text>
    // </TouchableOpacity>
    // <SearchTop />
    // <FilterBar />
    // <ScrollView style={styles.listCards}>
    // <View style={styles.listCard}>
    // <RestaurantCard layout='list' />
    // </View>
    // </ScrollView>
    // </SafeAreaView>
    // )
    // };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Feather name="arrow-left" size={24} color="#9e9e9e" />
                <Text style={styles.normalText}>Back</Text>
            </TouchableOpacity>
            <SearchTop search={searchQuery} onChangeText={setSearchQuery} fullData={restaurant} type={type} />
            <FilterBar />
            <ScrollView style={styles.listCards}>
                <View style={styles.listCard}>
                    {resultsComp}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 10,
    },

    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 5,
    },

    normalText: {
        fontSize: 16,
        fontFamily: 'Ubuntu-Medium',
        color: '#9e9e9e',
    },

    listCards: {
        marginTop: 20,
        marginBottom: 95,
    },

    listCard: {
        marginBottom: 15,
    }
})

export default SearchList