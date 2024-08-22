import React from 'react';
import {Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Liked from '../screens/Liked';
import Home from '../screens/Home';
import Map from '../screens/Map';
import Surprise from '../screens/Surprise';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import LoginScreen from '../screens/Login';
import RestaurantDetail from '../screens/Restaurant/RestaurantDetail';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/Signup';
import TopTabs from '../Components/TopTabs';
import CommentsPage from '../screens/CommentsPage';
import LogoutPage from '../screens/LogoutPage';
import ProfileCard from '../Components/ProfileCard';
import SearchList from '../screens/SearchList';
import SearchListDefault from '../screens/SearchListDefault';
import EndComments from '../screens/EndComments';
import Password from '../screens/Password';
import GuestScreen from '../screens/GuestScreem';
import { AuthContext } from '../Context/AuthContext'; 
import { useContext } from 'react';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RestaurantStack = createStackNavigator();

function RestaurantDetailStack() {
  return (
    <RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
      <RestaurantStack.Screen name="RestaurantTabs" component={RestaurantDetail} options={({ route }) => ({
          restaurantId: route.params?.restaurantId,
        })}/>
      <RestaurantStack.Screen name="leaveReview" component={CommentsPage} />
      <RestaurantStack.Screen name="EndComments" component={EndComments} />
      <RestaurantStack.Screen name="UserProfile" component={ProfileScreen} />
    </RestaurantStack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailStack} />
      <Stack.Screen name="SearchList" component={SearchList}  />
      <Stack.Screen name="SearchListDefault" component={SearchListDefault}  />
    </Stack.Navigator>
  );
}

function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapMain" component={Map} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailStack} />
    </Stack.Navigator>
  );
}

function SurpriseStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SurpriseMain" component={Surprise} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailStack} />
    </Stack.Navigator>
  );
}

function LikedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LikedMain" component={Liked} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetailStack} />
    </Stack.Navigator>
  );
}

function ProfileStack(){
  const { user } = useContext(AuthContext); 
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Conditional initial screen based on login status */}
      {user ? (
        <>
          <Stack.Screen name='ProfileMain' component={ProfileScreen} />
          <Stack.Screen name="ProfileCard" component={ProfileCard} />
          <Stack.Screen name='Logout' component={LogoutPage} />
          <Stack.Screen name='Password' component={Password} />
        </>
      ) : (
        <>
          <Stack.Screen name='Guest' component={GuestScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignUpScreen} />
          <Stack.Screen name='Password' component={Password} />
        </>
      )}
    </Stack.Navigator>
  )
}

function TabNav() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: ((route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "";
        if (routeName === 'RestaurantDetail') {
          return { display: 'none' };
        }
        return {
          height: 90,
          paddingTop: 10,
          elevation: 8,  
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4,
        };
      })(route),

      tabBarActiveTintColor: '#FF9400',  
      tabBarInactiveTintColor: '#9E9E9E',
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          let iconName;
          let iconSize = 24;

          if (route.name === 'Home') {
            IconComponent = Octicons;
            iconName = 'home';
          } else if (route.name === 'Map') {
            IconComponent = Ionicons;
            iconName = focused ? 'compass' : 'compass-outline';
            iconSize = 26;
          } else if (route.name === 'Surprise') {
            IconComponent = Ionicons;
            iconName = focused ? 'dice' : 'dice-outline';
            iconSize = 26;
          } else if (route.name === 'Liked') {
            IconComponent = Octicons;
            iconName = focused ? 'heart-fill':'heart'; 
          } else if (route.name === 'Profile') {
            IconComponent = FontAwesome;
            iconName = focused ? 'user-circle' : 'user-circle-o';
          }

          return <IconComponent name={iconName} size={iconSize} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => {
          return (
            <Text style={{
              color: focused? '#221C19':'#9e9e9e',
              fontSize: 10,
              fontWeight: focused ? 'bold' : 'normal',
              textTransform: 'uppercase',
            }}>
              {route.name}
            </Text>
          );
        },

        tabBarStyle: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          if (
            routeName === 'RestaurantDetail' ||
            routeName === 'UploadMenu' ||
            routeName === 'UserProfile'
          ) {
            return { display: 'none' };
          }
          return {
            height: 90,
            paddingTop: 10,
            elevation: 8,  
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 4,
          };
        })(route),
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Surprise" component={SurpriseStack} />
      <Tab.Screen name="Liked" component={LikedStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  )
}

export default TabNav;