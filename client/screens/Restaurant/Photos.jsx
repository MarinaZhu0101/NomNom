import React, { useContext, useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RestaurantContext } from '../../Context/RestaurantContext';
import { SingleRestaurantContext } from '../../Context/SingleRestaurantContext';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - (numColumns + 1) * 10) / numColumns;

const Photos = ({ }) => {
const [modalVisible, setModalVisible] = useState(false);
const [selectedPhoto, setSelectedPhoto] = useState(null);
const [loading, setLoading] = useState(false);
const { restaurant, error } = useContext(SingleRestaurantContext);

const [photos, setPhotos] = useState([]);


useEffect(() => {
if (restaurant) {
setLoading(true);

const images = restaurant.image || [];

if (Array.isArray(images)) {
const sortedPhotos = images.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));
setPhotos(sortedPhotos);
} else {
setPhotos([]);
}

setLoading(false);
}
}, [restaurant]);


const renderItem = ({ item }) => (
<TouchableOpacity onPress={() => handlePhotoPress(item.url)}>
<View style={styles.imageContainer}>
<Image
source={{ uri: item.url }}
style={styles.image}
onLoadStart={() => setLoading(true)}
onLoadEnd={() => setLoading(false)}
/>
{loading && (
<View style={styles.loadingContainer}>
<ActivityIndicator size="small" color="#0000ff" />
</View>
)}
</View>
</TouchableOpacity>
);

const handlePhotoPress = (url) => {
setSelectedPhoto(url);
setModalVisible(true);
};

const handleCloseModal = () => {
setModalVisible(false);
setSelectedPhoto(null);
};

return (
<View style={styles.container}>
<FlatList
data={photos}
renderItem={renderItem}
keyExtractor={(item) => item._id.toString()}
numColumns={numColumns}
key={numColumns}
contentContainerStyle={styles.flatListContainer}
/>
<Modal
visible={modalVisible}
transparent={true}
onRequestClose={handleCloseModal}
>
<View style={styles.modalContainer}>
<TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
<Image
source={{ uri: selectedPhoto }}
style={styles.modalImage}
onLoadStart={() => setLoading(true)}
onLoadEnd={() => setLoading(false)}
/>
{loading && (
<View style={styles.loadingContainer}>
<ActivityIndicator size="large" color="#0000ff" />
</View>
)}
</TouchableOpacity>
</View>
</Modal>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
},
flatListContainer: {
padding: 5,
},
imageContainer: {
position: 'relative',
padding: 5,
},
image: {
width: itemWidth,
height: itemWidth,
borderRadius: 8,
},
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
},
modalBackground: {
width: '100%',
height: '100%',
backgroundColor: 'rgba(0,0,0,0.8)',
justifyContent: 'center',
alignItems: 'center',
},
modalImage: {
width: '90%',
height: '40%',
resizeMode: 'cover',
borderRadius: 16,
},
loadingContainer: {
position: 'absolute',
top: 0,
left: 0,
right: 0,
bottom: 0,
justifyContent: 'center',
alignItems: 'center',
},
});

export default Photos;