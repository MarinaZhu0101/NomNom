import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RestaurantContext } from '../Context/RestaurantContext';
import { SingleRestaurantContext } from '../Context/SingleRestaurantContext';

const SearchTop = ({ search, onChangeText, onPress, fullData, type }) => {

    const [error, setError] = useState(null);
    const { restaurant, dishData } = useContext(RestaurantContext);
    // console.log("a", restaurant);


    const navigation = useNavigation();

    const handleSearch = () => {
        navigation.navigate("SearchList", {
            restaurant, dishData, type
        })
    }

    return (
        <View style={styles.Container}>
            <View style={styles.search}>
                <TextInput
                    onSubmitEditing={handleSearch}
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    value={search}
                    // onChangeText={queryText => setQuery(queryText)}
                    onChangeText={onChangeText}
                    // onEndEditing={queryText => setSearch(queryText)}
                    placeholder="Search"
                    placeholderTextColor={'#808080'}
                    style={styles.input}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                />
                {/* <Button title="🔍" onPress={onSearch} /> */}
                {/* <TouchableOpacity style={styles.button} onPress={handleReset}>
<Image
style={{height: 20, width: 20, marginRight: 5}}
resizeMode="contain"
source={require('../assets/reset-02.png')}
// style={styles.image}
/>
</TouchableOpacity> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#FFC5A5',
        padding: 5,
        borderRadius: 20,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    search: {
        flex: 1,
        flexDirection: 'column'
    },
    searchIcon: {
        marginRight: 5

    },
    input: {
        marginLeft: 5,
    },
    voiceContainer: {
        marginLeft: 5,
    }

});

export default SearchTop;