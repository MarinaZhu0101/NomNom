import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView, Image} from "react-native"
import { useEffect, useState, useContext } from "react";
import ProfileCard from "../Components/ProfileCard";
import Achievements from "../Components/Achievements";
import UserReview from "../Components/UserReviews";
import ReviewBlock from "../Components/ReviewBlockk";
import { AuthContext } from '../Context/AuthContext';
import { Feather } from "@expo/vector-icons";
import axios from 'axios';


const tabs = [
    {key: 'achievements', title: 'Achievements'},
    {key:'reviews', title: 'Reviews'}
]

const GuestScreen = ({navigation}) => {

    const [activeTab, setActiveTab] = useState(tabs[0].key); 
    const { user, logout } = useContext(AuthContext);

    const tagsData = [
    'Brunch', 'Cheese', 'Date'
    ]   
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogin = () => {
        navigation.navigate('Login')
    }

    const handleSignup = () => {
        navigation.navigate('Signup')
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigation.navigate('Logout'); 
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileTopContainer}>
        <View style={styles.userName}>
            <Text style={styles.userNameText}>Guest</Text>
            <TouchableOpacity style={styles.settingIcon} onPress={toggleDropdown}>
                <Feather name="settings" size={15} color={'white'}/>
            </TouchableOpacity>
        </View>
        {dropdownVisible && (
            <View style={styles.dropdownContainer}>
                <TouchableOpacity style={styles.dropdownItem} onPress={handleLogin}>
                    <Text style={styles.dropdownText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={handleSignup}>
                    <Text style={styles.dropdownText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )}
        <View style={styles.profileBottomContainer}>
            <View>
                <Image source={require('../assets/avatar.jpg')}
                style={styles.profileImage}/>
                <Image
                source={{ uri: 'https://cdn.countryflags.com/thumbs/ireland/flag-round-250.png' }}
                style={styles.flagImage}
            />
            </View>
            <View style={styles.levelContainer}>
                <Text style={styles.levelText}>
                    Food Critic Level 0
                </Text>
                <Feather name="chevron-right" size={16} color={'#FFB300'}/>
            </View>
            <View style={styles.tags}>

            {user?.diningPreferences?.length > 0 &&
                user.diningPreferences.map((tag, index) => (
                <View key={index} style={styles.tagsContainer}>
                    <Text style={styles.tagText}>
                     {tag}
                    </Text>
                </View>
                ))
            }
            </View>

            
            <View style={styles.bioContainer}>
                <Text style={styles.bioText}>Hello welcome to NomNom</Text>
                <Feather name="edit-3" size={15} color={'#9E9E9E'}/>
            </View>
        </View>
    </View>
            <View style={styles.tabsContainer}>
                {tabs.map((tab)=>(
                    <TouchableOpacity
                        key={tab.key}
                        style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                        onPress={() => setActiveTab(tab.key)}
                    >
                        <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.contentContainer}>
            {activeTab === 'achievements' && (
                <View style={styles.guestLog}>
                    <TouchableOpacity style={styles.guestLogButton} onPress={()=>{navigation.navigate('Login')}}>
                        <Text style={styles.guestLogText}>Guest Login</Text>
                    </TouchableOpacity>
                    <Image 
                        source={require('../assets/5 SCENE.png')} 
                        style={styles.tabImage}
                    />
                </View>
            )}
            {activeTab === 'reviews' && (
                <View style={styles.guestLog}>
                <TouchableOpacity style={styles.guestLogButton} onPress={()=>{navigation.navigate('Login')}}>
                    <Text style={styles.guestLogText}>Guest Login</Text>
                </TouchableOpacity>
                <Image 
                    source={require('../assets/2 SCENE.png')} 
                    style={styles.tabImage}
                />
            </View>
            )}
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    tab: {
        paddingBottom: 10,
        borderBottomWidth: 2,
        fontFamily:'Ubuntu-Medium',
        borderColor: 'transparent',
    },
    activeTab: {
        borderColor: '#FFB300',
    },
    tabText: {
        fontSize: 16,
        fontFamily:'Ubuntu-Medium',
        color: '#9E9E9E',
    },
    activeTabText: {
        fontSize: 16,
         fontFamily:'Ubuntu-Medium',
        color: 'black'
    },
    contentContainer: {
        padding: 20,
    },
    profileTopContainer:{
        height: 300,
        backgroundColor: 'white',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowColor: 'rgb(200, 200, 200)',
        shadowOffset : {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.6,
        shadowRadius: 3,
    },
    userName: {
        paddingHorizontal: 20,
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    userNameText: {
        fontFamily: 'Ubuntu-Medium',
        fontSize: 24,
        paddingRight: 118
    },
    settingIcon:{
        justifyContent: 'center',
        alignItems:'center',
        width: 25,
        height: 25,
        borderRadius: 20,
        backgroundColor: '#221C19',
        marginTop: 2
    },
    profileBottomContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
        marginTop: 5,
    },
    flagImage: {
        position: 'absolute',
        width: 25,
        height: 25,
        borderRadius: 12.5,
        bottom: 0,
        right: -5,
        borderColor: 'white',
        borderWidth: 2,
    },
    levelContainer: {
        flexDirection: 'row',
        marginTop: 10,
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: 'rgb(200,200,200)',
        shadowOffset:{
            width: 1,
            height: 3
        },
        shadowOpacity: 0.4,
        shadowRadius: 3
    },
    levelText: {
        fontFamily: 'Ubuntu-Regular',
    },
    tags: {
        flexDirection: 'row'
    },
    tagsContainer: {
        marginTop: 20,
        width: 75,
        paddingVertical: 1,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 10,
        alignItems:'center',
    },
    tagText:{
        fontFamily: 'Ubuntu-Regular',
        textAlign: 'center',
        color:'#6e6e6e',
    },

    bioContainer:{
        flexDirection: 'row',
        marginTop: 25,
        gap: 5,
        alignItems:'center',
    },

    bioText: {
        fontFamily: 'Ubuntu-Regular',
        color: '#9E9E9E'
    },

    dropdownContainer: {
        position: 'absolute',
        right: 10,
        top: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        zIndex: 1000,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(200,200,200)',
    },
    dropdownText: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: 15,
    },
    tabImage:{
        width: 300,
        height: 150,
    },
    contentContainer:{
        alignItems:'center',
        marginVertical: 30
    },
    guestLog:{
        alignItems:'center'
    },
    guestText:{
        fontSize: 12,
        fontFamily: 'Ubuntu-Regular',
        color: 'black'
    },
    guestLogButton:{
        backgroundColor: '#FFB300',
        padding: 10,
        borderRadius: 20,
        marginVertical: 20
    },
    guestLogText:{
        color:'white',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 15,
    }
})

export default GuestScreen;