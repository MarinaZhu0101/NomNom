import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Alert, Platform } from 'react-native';
import React, { useState } from 'react';
import DishItem from '../../Components/DishItems';

export default function MenuDetails({ menuItems, restaurant_id }) {
    // console.log("MenuDetails - menuItems: ", menuItems);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // console.log("selectedCategory: ", selectedCategory);

    const getPrice = (priceObj) => {
        if (Object.prototype.toString.call(priceObj) === "[object Number]") {
            return parseFloat(priceObj).toFixed(2);
        }
        if (typeof priceObj === 'object' && priceObj !== null && '$numberDouble' in priceObj) {
            return parseFloat(priceObj.$numberDouble).toFixed(2);
        }
        return '-.--';
    };

    const categoryMap = {};
    menuItems.forEach(dish => {
        if (!categoryMap[dish.category]) {
            categoryMap[dish.category] = [];
        }
        categoryMap[dish.category].push(dish);
    });

    const categories = Object.keys(categoryMap);
    const filteredMenuItems = selectedCategory ? categoryMap[selectedCategory] : menuItems;

    // console.log("MenuDetails - filteredMenuItems: ", filteredMenuItems);

    return (
        <View style={styles.container}>
            <View style={styles.categoryTagsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity onPress={() => setSelectedCategory(null)} style={[styles.categoryTag, selectedCategory === null && styles.selectedCategoryTag]}>
                        <Text style={[styles.categoryTagText, selectedCategory === null && styles.selectedCategoryTagText]}>All</Text>
                    </TouchableOpacity>
                    {categories.map((category) => (
                        <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)} style={[styles.categoryTag, selectedCategory === category && styles.selectedCategoryTag]}>
                            <Text style={[styles.categoryTagText, selectedCategory === category && styles.selectedCategoryTagText]}>{category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView
                style={styles.menuContainer}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {selectedCategory === null ? categories.map((category) => (
                    <View key={category}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        {categoryMap[category].map((item) => {
                            console.log('Dish Item:', item);
                            return (
                            <DishItem
                                key={item._id}
                                dishId={item._id} 
                                name={item.name}
                                price={getPrice(item.price)}
                                description={item.description}
                                rating={item.rating}
                            />
                        );
                        })}
                    </View>
                ))
                    : filteredMenuItems.map((item) => (
                        <DishItem
                            key={item._id}
                            dishId={item._id} 
                            name={item.name}
                            price={getPrice(item.price)}
                            description={item.description}
                            rating={item.rating}
                        />
                    ))}
            </ScrollView>

            {/* <View style={styles.uploadBox}>
<View style={styles.promptBox}>
<Text style={styles.promptText}>Menu has changed? </Text>
<Text style={styles.promptText}>Help by uploading menu photos</Text>
</View>
<TouchableOpacity
style={styles.uploadButton}
onPress={()=> Alert.alert('upload function goes here')}
>
<Text style={styles.buttonText}>Upload Menu</Text>
</TouchableOpacity>
</View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f9',
    },
    categoryTagsContainer: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    categoryTag: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 15,
        backgroundColor: "#ffffff"
    },
    selectedCategoryTag: {
        backgroundColor: '#FFB300',
        shadowColor: 'rgb(100, 100, 100)',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

  categoryTagText: {
    color: '#707070',
    fontSize: 12,
    fontFamily: 'Ubuntu-Regular',
  },
  selectedCategoryTagText: {
    color: '#000000',
  },
  menuContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
    marginBottom: 15,
    marginLeft: 15,
    color: '#000'
  },
    uploadBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#fff',
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    uploadButton: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#FFCDB2',
    },

    promptBox: {
        flexDirection: 'column',
        gap: 2,
    },

    promptText: {
        color: '#6e6e6e',
        fontFamily: 'Ubuntu-Regular',
        fontSize: 14,
    },
    buttonText: {
        color: '221C19',
        fontFamily: 'Ubuntu-Medium',
        fontSize: 14,
    },
});

export const title = 'Menu';
export const description = 'Menu Details';