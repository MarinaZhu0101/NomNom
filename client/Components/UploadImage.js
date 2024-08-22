import React, { useEffect, useState, useContext } from 'react';
import { Button, Image, View, StyleSheet, Modal, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AWS from "aws-sdk";
// import CreateMenu from '../screens/Restaurant/CreateMenu';

AWS.config.update({
accessKeyId: "AKIA6ODU2WFB5LY5KCVI",
secretAccessKey: "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",
region: "eu-west-1",
});

const s3 = new AWS.S3();

const uploadFiletoS3 = (bucketName, fileKey, filePath) => {
const params = {
Bucket: bucketName,
Key: fileKey,
Body: filePath
};

return s3.upload(params).promise();

}

export default function ImagePickerExample({restaurantId, onPress}) {
const [image, setImage] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
const [menu_info, setRestaurantInfo] = useState(null);
const [showAction, setShowAction] = useState(false);
const [menuItems, setMenu] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [stepOneDone, setStepOne] = useState(false);
const [stepTwoDone, setStepTwo] = useState(false);
const [stepThreeDone, setStepThree] = useState(false);

const toggleAction = () => {
setShowAction(!showAction);
};

const bucketName = "nom.bucket";
const folderName = "menus";

const fileName = "test.jpg"
const fileKey = `${folderName}/${fileName}`; // This specifies the folder and file name

const imagePath = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;

// console.log("step one before: ", stepOneDone)

const pickImage = async () => {
setStepOne(false);
// No permissions request is necessary for launching the image library
let result = await ImagePicker.launchImageLibraryAsync({
mediaTypes: ImagePicker.MediaTypeOptions.All,
// allowsMultipleSelection: true,
allowsEditing: true,
aspect: [4, 3],
quality: 1,
// selectionLimit: 5
});

if (!result.canceled) {
setImage(result.assets[0].uri);
const filePath = result.assets[0].uri.replace("file://", "");

// what is this snippet doing?

try {
const fileData = await fetch(filePath).then(response =>
response.blob(),
);
await uploadFiletoS3(bucketName, fileKey, fileData);
// console.log("File UPLOAD YEEEAH:", fileKey);
setModalVisible(true);
setStepOne(true);
// console.log("step one after: ", stepOneDone)
} catch (uploadError) {
console.error("Error uploading file:", uploadError);
Alert.alert('Error', "File upload failed");
}
}
// setModalVisible(true); // correct located?
};

const closeModal = () => {
setModalVisible(false);
};

const addItem = async (data, menuId) => {
// Insert dishes and update their menu_id references
// console.log("data:", data);
// console.log("addItem function ---- data: ", JSON.stringify(JSON.parse(data)));

json_data = JSON.parse(data);

// console.log("json_data.restaurants: ", json_data.restaurants[0].menu.categories);

const dishPromises = json_data.restaurants[0].menu.categories.flatMap(category => {
return category.dishes.map(dish => ({
menu_id: menuId,
name: dish.name,
description: dish.description,
category: category.name,
price: dish.price,
note: dish.note
}));
});

console.log("dishes", dishPromises)

try {
const requestBody = {
menu_id: menu_info,
dishes: dishPromises
};
const response = await axios.post('http://localhost:6868/dishes/add-menu', JSON.stringify(requestBody),
{
headers: {
'Content-Type': 'application/json'
}
}
);
console.log(response.error);

setStepTwo(true);
} catch (error) {
console.error('Error adding item:', error);
}
};

const fetchRestaurantInfo = async (restaurantId) => {
try {
// const restaurant_info = await axios.get(`http://localhost:6868/restaurants/${restaurantId}`);

// const restaurantsData = JSON.parse(restaurant_info).restaurants;

// console.log("restaurantsData: ", restaurant_info.data)
console.log("UploadImage - restaurantId: ", restaurantId);

const menu_response = await axios.get(`http://localhost:6868/menus/restaurantId/${restaurantId}`);

const menus = menu_response.data;

// Access the restaurant_id of the first (and only) menu
const menuId = menus[0].menu_id;

console.log("menuId: ", menuId)
console.log("Menu ID available!");
setRestaurantInfo(menuId);
} catch (error) {
console.error("Error fetching restaurant data from server:", error);
}
}

fetchRestaurantInfo(restaurantId);

const fetchImageFromServer = async (imageUri) => {
// Extract the filename from the URI
console.log("image uri", imageUri);

const filename = imageUri.split('/').pop();

try {
console.log("Reaching (skipping) Flask...");
const response = await axios.get(`http://127.0.0.1:5000/fetch-image`, {
params: {
bucket_name: 'nom.bucket',
image_key: "menus/" + filename
},
});
console.log("Flask request done!");
// fetchRestaurantInfo(restaurantId);
console.log("Setting image from server...");
console.log("Setting done!");
console.log("response: ", response.request._response)
console.log("This is the menu id: ", menu_info)
addItem(response.request._response, menu_info);
} catch (error) {
console.error("Error fetching image from server:", error);
}
};

return (
<View style={styles.container}>
<View style={styles.floatingButton}>
{(showAction &&
<View>
<TouchableOpacity activeOpacity={0.5} style={[
styles.UploadButtonContainer,
{ backgroundColor: stepOneDone ? 'green' : '#FFB300' }
]} onPress={pickImage}>
<Text style={styles.UploadButtonText}>Upload menu</Text>
</TouchableOpacity>
<TouchableOpacity activeOpacity={0.5} style={[
styles.UploadButtonContainer,
{ backgroundColor: stepTwoDone ? 'green' : '#FFB300' }
]} onPress={() => { fetchImageFromServer(imagePath) }}>
<Text style={styles.UploadButtonText}>Check new data</Text>
</TouchableOpacity>
<TouchableOpacity activeOpacity={0.5} style={styles.UploadButtonContainer} onPress={() => { onPress() } }>
<Text style={styles.UploadButtonText}>Fetch menu</Text>
</TouchableOpacity>
</View>
)}

<TouchableOpacity activeOpacity={0.5} style={styles.ActionButton} onPress={toggleAction}>
{!showAction ?
(<Text style={styles.ActionButtonText}>+</Text>) : (<Text style={styles.ActionButtonText}>×</Text>)}
</TouchableOpacity>
</View>
<Modal
animationType="fade"
transparent={true}
visible={modalVisible}
onRequestClose={closeModal}
>
<View style={styles.modalOverlay}>
<View style={styles.modalContainer}>
<TouchableOpacity style={styles.closeButton} onPress={closeModal}>
<Text style={styles.closeButtonText}>x</Text>
</TouchableOpacity>
<Text style={styles.modalTitle}>Thank you for your submission!</Text>
<Text style={styles.modalMessage}>
Your menu will be reviewed. This process will take up to 24 hours.
</Text>
</View>
</View>
</Modal>
</View>
);
}

const styles = StyleSheet.create({
UploadButtonContainer: {
backgroundColor: "#FFB300",
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 5,
alignItems: 'center',
},
UploadButtonText: {
color: "white",
fontSize: 16,
fontWeight: "bold",
},
UploadButtonStyle: {
color: "white",
// flex: 0,
// backgroundColor: "#FFC93C",
// resizeMode: 'contain',
width: 100,
height: 50,
},
FloatingButtonStyle: {
resizeMode: 'contain',
// backgroundColor: "pink",

width: 50,
height: 50,
},
floatingButton: {
flex: 1,
position: "absolute",
// flexDirection: 'row', // Arrange children horizontally
// justifyContent: 'flex-end',
// backgroundColor: "green",
alignItems: 'flex-end',
marginBottom: "4%",
marginRight: "-3%",
right: 30,
bottom: 30
},
TouchableOpacityStyle: {
// flex: 1,
// flexDirection: "row",
// position: 'absolute',
alignItems: "center",
justifyContent: "center",
// backgroundColor: "orange",
// right: 30,
// bottom: 30
},
ActionButton: {
// color: "white",
backgroundColor: '#FFB300', // Yellow background color
width: 60, // Width of the button (adjust as needed)
height: 60, // Height of the button (adjust as needed)
borderRadius: 30, // Half of width/height to make it a perfect circle
justifyContent: 'center', // Center the "+" vertically
alignItems: 'center', // Center the "+" horizontally
// position: 'absolute', // Position it absolutely if needed
// right: 30, // Position from the right (adjust as needed)
// bottom: 30, // Position from the bottom (adjust as needed)
},
ActionButtonText: {
color: 'white', // Color of the "+"
fontSize: 30, // Font size of the "+"
fontWeight: 'bold', // Make the "+" bold
},
container: {
// flex: 1,
alignItems: 'center',
justifyContent: 'center',
marginBottom: 20,
// fontFamily: 'Ubuntu-Medium',
backgroundColor: "purple",

},
image: {
width: 200,
height: 200,
},
modalOverlay: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContainer: {
width: 300,
padding: 20,
backgroundColor: 'white',
borderRadius: 10,
alignItems: 'center',
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 4,
elevation: 5,
},
closeButton: {
alignSelf: 'flex-end',
},
closeButtonText: {
fontSize: 18,
color: '#aaa',
},
modalTitle: {
marginTop: 10,
marginLeft: 2,
marginRight: 2,
fontSize: 17,
fontWeight: 'bold',
marginBottom: 10,
},
modalMessage: {
marginTop: 10,
fontSize: 14,
textAlign: 'center',
marginBottom: 10,
},
});