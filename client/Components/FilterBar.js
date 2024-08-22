import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image} from "react-native"
import { useState } from "react";

const FilterBar =() => {
    const [selectedTags, setSelectedTags] = useState([]);
    const tagsData = ['Open Now', 'Budget Meal', 'Vegan', 'Offers', 'Fine Dining', 'Rating 4.5'];
 
    const toggleTag = (tag) => {
      if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter(t => t !== tag));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    };
    return (
        <View style={styles.tagTop}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} >

        <TouchableOpacity style={[styles.filterTag]}>
            <Text style={[styles.tagText]}>
                Filter
            </Text>
            <Image source={require('../assets/Filter.png')}/>
        </TouchableOpacity>
        {tagsData.map((tag) => (
            <TouchableOpacity
                key={tag}
                style={[
                    styles.tag,
                    selectedTags.includes(tag) && styles.selectedTag,
                ]}
                onPress={() => toggleTag(tag)}
            >
                <Text style={[
                    styles.tagText,
                    selectedTags.includes(tag) && styles.selectedTagText
                ]}>
                    {tag}
                </Text>
            </TouchableOpacity>
        ))}

    </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    tagTop:{
        flexDirection:'row',
        marginVertical: 5,
        height: 30
    },
    filterTag:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#FFC5A5',
        borderRadius: 15,
        paddingHorizontal: 12,
        margin: 2,
        shadowColor: 'rgb(100, 100, 100)',
        shadowOffset : {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#FFC5A5',
        borderRadius: 15,
        margin: 2,
        shadowColor: 'rgb(100, 100, 100)',
        shadowOffset : {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        minWidth: 90,
    },
    tagText:{
        color:'#6E6E6E',
        fontSize: 12,
        fontFamily: 'Ubuntu_Regular',
    },
    selectedTag: {
        backgroundColor: '#FFB300',
        borderColor: '#FFB300'
    },
    selectedTagText: {
        color: 'black',
        fontFamily:'Ubuntu-Medium',
    },
})

export default FilterBar