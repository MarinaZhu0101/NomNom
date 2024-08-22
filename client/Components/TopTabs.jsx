import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MenuInfo from './MenuInfo';
import Photos from '../screens/Restaurant/Photos';
import Reviews from '../screens/Restaurant/Reviews';
import RestaurantOverview from '../screens/Restaurant/RestaurantOverview';
import { useNavigation, useRoute } from '@react-navigation/native';

// const uniquerestaurantId = "668ee8afc88d544d82f31746"; // yamamori

// const photosData = [
//   { id: '1', url: 'https://feelgoodfoodie.net/wp-content/uploads/2023/04/Pasta-Bolognese-TIMG.jpg' },
//   { id: '2', url: 'https://images.immediate.co.uk/production/volatile/sites/30/2024/01/Fried-bread-408ec8e.jpg?quality=90&resize=556,505' },
//   { id: '3', url: 'https://food-images.files.bbci.co.uk/food/recipes/chicken_and_seafood_62744_16x9.jpg' },
//   { id: '4', url: 'https://www.allrecipes.com/thmb/ympIQl1YNYWFMvwKLMLx8EnG-to=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/79543-fried-rice-restaurant-style-DDMFS-4x3-b79a6ea27e0344399257ca1df67ca1cd.jpg' },
//   { id: '5', url: 'https://www.noracooks.com/wp-content/uploads/2023/03/ChickpeaCurry-2189-2.jpg' },
//   { id: '6', url: 'https://static.toiimg.com/photo/88489342.cms' },
//   { id: '7', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-3wl39eAmxReyrbQrXo4pRW9YgFDOFNGCg&s'},
//   { id: '8', url: 'https://img.traveltriangle.com/blog/wp-content/uploads/2018/05/Korean-Food-Cover.jpg' },
//   { id: '9', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlVp2r878UcchwHQAWMliwWB9u0ugrX7jjkQ&s' },
//   { id: '10', url: 'https://media.cnn.com/api/v1/images/stellar/prod/181115105819-korean-food149201306006k-gimbap.jpg?q=w_1600,h_900,x_0,y_0,c_fill' },
//   { id: '11', url: 'https://media.timeout.com/images/106018241/750/562/image.jpg' },
//   { id: '12', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqwyQDzcROno1-o6dfOWGC05CAMAXE2UlnFw&s' },
//   //...
// ];

const TopTabs = ( ) => {
  const navigation = useNavigation();
  const route = useRoute();
  const restaurantId = route.params?.restaurantId;

  const OverviewRoute = () => ( 
    <RestaurantOverview 
      restaurantId={restaurantId} 
      navigation={navigation}
    />
  );

  const MenuRoute = () => (
    <MenuInfo 
      restaurantId={restaurantId} 
      navigation={navigation}
    />
  );

  const PhotosRoute = () => (
    <Photos 
      photos={restaurantId} 
      navigation={navigation}
    />
  );

  const ReviewsRoute = () => (
    <Reviews 
      restaurantId={restaurantId} 
      navigation={navigation}
    />
  );

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'overview', title: 'Overview' },
    { key: 'menu', title: 'Menu' }, 
    { key: 'photos', title: 'Photos' },
    { key: 'review', title: 'Reviews' },
  ]);

  const handleTabChange = (tabName) => {
    const tabIndex = routes.findIndex(route => route.key === tabName);
    if (tabIndex !== -1) {
      setIndex(tabIndex);
    }
  };
  const renderScene = SceneMap({
    overview: () => <RestaurantOverview restaurantId={restaurantId} onTabChange={handleTabChange} />,
    menu: MenuRoute,
    photos: PhotosRoute,
    review: ReviewsRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="#000000"
      inactiveColor="#6e6e6e"
    />
  );

  useEffect(() => {
    if (route.params?.screen) {
      const initialIndex = routes.findIndex(r => r.key === route.params.screen);
      if (initialIndex !== -1) {
        setIndex(initialIndex);
      }
    }
  }, [route.params?.screen]);

  return (
    <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={renderTabBar}
        />
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    backgroundColor: '#fff',
  },
  indicator: {
    backgroundColor: '#FFB300',
  },
  tabLabel: {
    fontSize: 12,
    fontFamily:'Ubuntu-Medium',
  },
});

export default TopTabs;