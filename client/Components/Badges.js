import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"

const Badges = () => {
    const badges = [
        { id: 1, name: "Food Critic", image: require('../assets/Polygon 7.jpg') },
        { id: 2, name: "Sushi Expert", image: require('../assets/Polygon 11.jpg') },
        { id: 3, name: "Speak 4 all", image: require('../assets/Polygon 12.jpg') },
        { id: 4, name: "Pause and Ponder", image: require('../assets/Polygon 12.jpg') },
        { id: 5, name: "Menu Collector", image: require('../assets/Polygon 12.jpg') },
        { id: 6, name: "You're on Fire", image: require('../assets/Polygon 12.jpg') },
    ];

    return (
            <View style={styles.badgesContainer}>
                <Text style={styles.title}>Badges</Text>
                <View  style={styles.polygonContainer}>
                {badges.map(badge => (
                    <View key={badge.id} style={styles.eachBadges}>
                        <Image source={badge.image} style={styles.polygonImage} />
                        <Text style={styles.badgeText}>{badge.name}</Text>
                    </View>
                ))}
                </View>
            </View>  
    )
}

const styles = StyleSheet.create({
    badgesContainer:{
        marginTop: 25,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'rgb(200,200,200)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.8,
        shadowRadius:3
    },
    title:{
        fontFamily: 'Ubuntu-Medium',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 15,
    },
    polygonContainer:{
        marginHorizontal: 20,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap:'wrap',
    },
    polygonImage:{
        width: 90,
        height: 90,
        marginTop: 20
    },
    badgeText:{
        fontFamily: 'Ubuntu-Regular',
        fontSize: 12,
        textAlign:'center',
        paddingTop: 5
    },
    eachBadges: {
        alignItems: 'center',
    }
})

export default Badges