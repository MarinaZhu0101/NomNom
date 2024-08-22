import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image} from "react-native"
import { Feather, MaterialIcons } from '@expo/vector-icons';


const VibeCard = ({navigation}) => {
    const vibeTypes = [
        {
            id: 1,
            vibe: 'Family Dining',
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqhkS51WqaMjCSGkl-2ln4AiAiXnLdNMaybg&s'
        },
        {
            id: 2,
            vibe: 'Date',
            photo: 'https://i.iheart.com/v3/re/assets.getty/62a10eda1c27d86dfd5e5296?ops=contain(1480,0)'
        },
        {
            id: 3,
            vibe: 'Cafe',
            photo: 'https://media.istockphoto.com/id/1400194993/photo/cappuccino-art.jpg?s=612x612&w=0&k=20&c=_nYOcyQ15cYEeUYgUzkC5qG946nkCwU06NiWKt1s8SE='
        },
        {
            id: 4,
            vibe: 'Buffet',
            photo: 'https://www.shutterstock.com/image-photo/open-buffet-very-delicious-varieties-600nw-1919678066.jpg'
        },
        {
            id: 5,
            vibe: 'Pet Friendly',
            photo: 'https://i2-prod.belfastlive.co.uk/incoming/article20665454.ece/ALTERNATES/s615/186474713_4054781047913370_6762385684807571831_n.jpg'
        },
        {
            id: 6,
            vibe: 'Budget Meal',
            photo: 'https://b.zmtcdn.com/data/pictures/chains/4/18436014/7dcbeb963a37d5339ceee9c6a9bda222.jpg?fit=around|750:500&crop=750:500;*,*'
        },
        
    ]

    const handleSearch = () =>{
        navigation.navigate('SearchListDefault')
    };

    return(
        <View style={styles.vibeContainer}>
        {vibeTypes.map((item)=>(
            <TouchableOpacity style={styles.vibeEach} key={item.id} onPress={handleSearch}>
                <Image source={{uri:item.photo}} style={styles.vibeImage}/>
                <View style={styles.vibeName}>
                    <Text style={styles.vibeNameText}>{item.vibe}</Text>
                    <Feather name="arrow-up-right" size={18} color={'blue'}/>
                </View>
            </TouchableOpacity>
        ))}
    </View>
    )
}

const styles = StyleSheet.create({
    vibeContainer: {
        paddingLeft: 20,
        flexDirection: 'row',
        flexWrap: 'wrap', 
    },
    vibeEach: {
        paddingRight: 9,
        paddingBottom: 10
    },
    vibeImage: {
        width: 110,
        height: 85,
        borderRadius: 5
    },
    vibeName: {
        flexDirection: 'row',
        paddingTop: 5,
        width: 110,
        justifyContent: 'space-between'
    },
    vibeNameText :{
        fontSize: 12,
        fontFamily: 'Ubuntu_Regular',
        color: '#6E6E6E'
    }
  });

export default VibeCard