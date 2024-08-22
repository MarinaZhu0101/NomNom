import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuDetails from '../screens/MenuDetails';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

const MenuDetailsContainer = ({ restaurantId }) => {
  const [menuItems, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
        try {
          const first_response = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}`);
  
          // response.data is an array of menus
          const menus = first_response.data;

          const menuId = menus[0].menu_id;
          const second_response = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`)

  
        //   if (menus.length > 0) {
        //       // Access the restaurant_id of the first (and only) menu
        //       const menuId = menus[0].menu_id;
        //       const second_response = await axios.get(`http://localhost:6868/dishes/menuId/${menuId}`)
        //   } else {
        //       console.log('No menus found for the specified restaurant ID.');
        //   }
  
          // setMenu(response.data);
          setMenu(second_response.data);
      } catch (error) {
        setError('Error fetching menu data (MenuDetailsContainer)');
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurantId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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

  return <MenuDetails menuItems={menuItems} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

});

export default MenuDetailsContainer;
