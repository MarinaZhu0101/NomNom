import React, { createContext, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import * as Location from 'expo-location';
import TabNav from './Navigations/TabNav';
import { UserLocation } from './Context/UserLocation';
import { useFonts } from 'expo-font';
import { RestaurantProvider } from './Context/RestaurantContext';
import { AuthProvider } from './Context/AuthContext';
import { SearchProvider } from './Context/SearchContext';
import { SingleRestaurantProvider } from './Context/SingleRestaurantContext';

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loaded, error] = useFonts({
        'Ubuntu-Regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
        'Ubuntu-Medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
        'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
    });

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <AuthProvider>
                <RestaurantProvider>
                    <SingleRestaurantProvider>
                        <UserLocation.Provider
                            value={{ location, setLocation }}>
                            <SearchProvider>
                                <NavigationContainer>
                                    <TabNav />
                                </NavigationContainer>
                            </SearchProvider>
                        </UserLocation.Provider>
                    </SingleRestaurantProvider>
                </RestaurantProvider>
            </AuthProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        fontFamily: 'Ubuntu-Regular',
    },
})