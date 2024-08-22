import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ViewComponent} from "react-native"

const LogoutPage= ({navigation}) => {
    const handleLogin = () => {
        navigation.navigate('Login')
    }
    const handleSignup = () => {
        navigation.navigate('Signup')
    }
    return(
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/Heart with roses.jpg')} style={styles.heartImage}/>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Welcome to NomNom</Text>
                <Text style={styles.titleTextTwo}>You are browsing in the guest mode</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonOne} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTwo} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
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
        fontFamily: 'Ubuntu-Medium',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20
    },
    titleTextTwo:{
        fontFamily: 'Ubuntu-Medium',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10
    },
    buttonContainer:{
        flexDirection: 'row',
        marginTop: 40,
        width: 250,
        justifyContent:'space-between'
    },
    buttonOne:{
        paddingVertical: 10,
        width: 100,
        backgroundColor: '#FFB300',
        borderRadius: 20
    },
    buttonTwo: {
        paddingVertical: 10,
        width: 100,
        backgroundColor: '#FFB300',
        borderRadius: 20
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Ubuntu-Medium'
    }
})

export default LogoutPage