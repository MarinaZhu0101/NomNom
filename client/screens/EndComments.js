import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"

const EndComments= () => {
  
    return(
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/Heart with roses.jpg')} style={styles.heartImage}/>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Thank you for your valuable and honest review</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    heartImage:{
        width:276,
        height: 276,
        marginTop: 80
    },
    titleText:{
        fontFamily: 'Ubuntu_Medium',
        fontSize: 16,
        width: 220,
        textAlign: 'center',
        marginTop: 20
    }
})

export default EndComments