import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView} from "react-native"
import { useEffect, useState, useContext } from "react";
import ProfileCard from "../Components/ProfileCard";
import Achievements from "../Components/Achievements";
import UserReview from "../Components/UserReviews";
import ReviewBlock from "../Components/ReviewBlockk";
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';


const tabs = [
    {key: 'achievements', title: 'Achievements'},
    {key:'reviews', title: 'Reviews'}
]

const ProfileScreen = ({navigation}) => {

    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [activeTab, setActiveTab] = useState(tabs[0].key); 

    useEffect(() => {
        console.log('User in ProfileScreen:', user); 
        const fetchUserReviews = async () => {
            if (!user?.id) {
                setLoading(false);  
                return;
            }

          setLoading(true);
          try {
            const response = await axios.get(`http://localhost:6868/reviews/user/${user.id}`);
            console.log('Fetched reviews:', response.data); 
            setReviews(Array.isArray(response.data) ? response.data : [response.data]);
          } catch (error) {
            setError('Error fetching user reviews');
            console.error('Error fetching user reviews:', error);
          } finally {
            setLoading(false);
          }
        };
    
        if (user?.id) {
          fetchUserReviews();
        }
      }, [user?.id]);
    
      if (loading) {
        return (
          <View style={[styles.loadingContainer, {justifyContent: 'center', alignItems: 'center'}]}>
            <ActivityIndicator size="large" color="#FFC93C" />
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

    const renderTabContent = (tabKey) => {
        switch (tabKey) {
            case 'achievements':
                return <Achievements />; 
            case 'reviews':
                if (!user) {
                    return <Text style={styles.notLoggedInText}>Please log in to see your reviews.</Text>;
                }
    
                console.log('Rendering ReviewBlock with reviews:', reviews); 
                return <ReviewBlock userReviews={reviews} />;
            default:
                return null;
        }
    };

    
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <ProfileCard navigation={navigation}/>
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
                {renderTabContent(activeTab)}
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
})

export default ProfileScreen;