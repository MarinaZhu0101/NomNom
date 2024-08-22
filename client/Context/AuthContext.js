import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = async (userData) => {
        try {
            const response = await fetch('http://localhost:6868/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Login failed:', data)
                throw new Error('Login failed');
            }

            const user = {
                id: data.userId, 
                username: data.username,
                email: data.email,
                ethnicity: data.ethnicity,
                dietaryRestrictions: data.dietary_restrictions,
                diningPreferences: data.dining_preferences,
                points: data.points,
                favouriteRestaurant: data.favourite_restaurant,
                favouriteDish: data.favourite_dish,
            };

            // const data = await response.json();
            console.log('Login succeeded:', data);
            setUser(user);
            console.log('User set in AuthContext:', user);
    
            await AsyncStorage.setItem('token', data.token);
            // console.log('Token saved to AsyncStorage:', data.token);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            setUser(null); 
            console.log('User set to null in AuthContext:', user);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{user, setUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
