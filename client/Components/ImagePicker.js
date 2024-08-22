import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"
import { Feather, MaterialIcons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';

const ImagePickerOne= ({ image, setImage }) => {

  const pickImage = async () => {
    if (image && image.length >= 3) {
      Alert.alert("Limit Reached", "You can only select up to 3 images.");
      return;
    }
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        const newImageUri = result.assets[0].uri;
        setImage((prevImages) => [...prevImages, newImageUri]);
        //console.log('Image selected: ', newImageUri); 
      } else {
        console.log('Image selection canceled');
      }
    };
    const removeImage = (uri) => {
      setImage((prevImages) => prevImages.filter((imageUri) => imageUri !== uri));
    };
  
    return(
        <View style={styles.addImageContainer}>
            <Text style={styles.addTitle}>Add Media!</Text>
            <View style={styles.imagesContainer}>
                <View style={styles.imagesContent}>
                    {image && image.map((imageUri, index) => (
                        <TouchableOpacity key={index} onPress={() => removeImage(imageUri)}>
                            <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                        </TouchableOpacity>
                    ))}
                </View>
                {(!image || image.length < 3) && (
                    <TouchableOpacity
                        style={styles.imagesIcon}
                        onPress={pickImage}
                    >
                        <Feather name="plus" size={20} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addImageContainer: {
        marginLeft: 25
    },
    addTitle:{
        fontFamily: 'Ubuntu-Bold',
        fontSize: 16,
        marginBottom: 5
    },
    imagesContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    imagesContent: {
        flexDirection: 'row',
      },
      selectedImage: {
        width: 90,
        height: 90,
        resizeMode: 'cover',
        borderRadius: 5,
        marginRight: 10,
      },
    imagesIcon:{
        backgroundColor: '#F1F1F1',
        paddingVertical: 20,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default ImagePickerOne