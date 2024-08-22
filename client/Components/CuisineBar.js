import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image} from "react-native"

const CuisineBar = ({navigation}) => {
    const cuisines = [
        {
            id: 1,
            photo: 'https://res.cloudinary.com/hz3gmuqw6/image/upload/c_fill,q_60,w_750,f_auto/5-samosas-canva-phppf0Q4I',
            cuisine: 'Indian'
        },
        {
            id: 2,
            photo: 'https://www.tastingtable.com/img/gallery/20-japanese-dishes-you-need-to-try-at-least-once/l-intro-1664219638.jpg',
            cuisine: 'Japanese'
        },
        {
            id: 3,
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUzlVE_BzT3y9MKmvx6QsCCOcWew7Y6jsk1w&s',
            cuisine: 'Arab'
        },
        {
            id: 4,
            photo: 'https://www.spectator.co.uk/wp-content/uploads/2023/09/iStock-1493915795.jpg?w=1254',
            cuisine: 'French'
        },
        {
            id: 5,
            photo: 'https://www.eatthis.com/wp-content/uploads/sites/4/2019/02/general-tso-chicken.jpg?quality=82&strip=all&w=1200',
            cuisine: 'Chinese'
        },
        {
            id: 6,
            photo: 'https://media.cnn.com/api/v1/images/stellar/prod/210211141204-05-classic-italian-dishes.jpg?q=w_1110,c_fill',
            cuisine: 'Italian'
        },
        {
            id: 7,
            photo: 'https://www.hogansirishcottages.com/blog/wp-content/uploads/sites/8/2020/01/ulster-fry-ireland.jpg',
            cuisine: 'Irish'
        },
    ]

    const handleSearch = () =>{
        navigation.navigate('SearchListDefault')
    };

    return(
        <View style={styles.cuisineContainer}>
        {cuisines.map((item)=>(
            <TouchableOpacity style={styles.eachCuisine} key={item.id} onPress={handleSearch}>
                <Image source={{uri:item.photo}} style={styles.cuisineImage}/>
                <Text style={styles.cuisineText}>{item.cuisine}</Text>
            </TouchableOpacity>
        ))}
    </View>
    )
}

const styles = StyleSheet.create({
    cuisineContainer: {
        paddingLeft: 20,
        flexDirection: 'row'
    },
    eachCuisine: {
        paddingRight: 15,
        justifyContent: 'center',
        alignItems:'center',
    },
    cuisineImage: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    cuisineText: {
        fontSize: 12,
        color: '#6E6E6E',
        fontWeight: '500',
        paddingTop: 5
    },
})

export default CuisineBar