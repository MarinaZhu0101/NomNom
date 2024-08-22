import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AppNavigator= () => {
    const navigation = useNavigation();
    return (
    <SafeAreaView style={styles.container}>
        <ImageBackground  source={require('../assets/background.jpg')} style={styles.background}>
            <Image source={require('../assets/logo.jpg')} style={styles.logo}/>
            <Text style={styles.title}>Welcome to NomNom</Text>
            <Text style={styles.year}>2024</Text>
        </ImageBackground>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.logButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textButton}>
                Log in with Email
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
            <Image source={require('../assets/google.jpg')} style={styles.icon}/>
            <Text style={styles.textButton}>
                Continue with Google
            </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signButton} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.textSign}>
                Sign Up
            </Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.guest}>
                Browse as guest
            </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    marginBottom: 20,
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  title:{
    fontSize: 20,
    fontWeight: '700',
    color:'rgb(80,80,80)'
  },
  year: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 5,
    color:'rgb(80,80,80)'
  },
  bottomSection: {
    backgroundColor: 'white',
    flex: 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  logButton:{
    backgroundColor:'rgb(210, 210, 210)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    width:"60%",
    marginTop:40,
    borderRadius: 10,
    shadowColor: 'rgb(210, 210, 210)',
    shadowOffset : {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  googleButton: {
    backgroundColor:'rgb(210, 210, 210)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    width:"60%",
    marginTop: 20,
    borderRadius: 10,
    flexDirection:"row",
  },
  icon:{
    width:20,
    height:20,
    marginRight: 8,
    borderRadius: 10
  },
  textButton:{
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  signButton:{
    borderWidth: 1,
    borderColor:'grey',
    paddingHorizontal: 20,
    paddingVertical: 12,
    width:"60%",
    marginTop: 35,
    borderRadius: 10,
  },
  textSign:{
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: 'rgb(100, 100, 100)'
  },
  guest:{
    fontSize: 13,
    fontWeight: "500",
    marginTop: 25,
    color: 'rgb(130, 130, 130)'
  }
});

export default AppNavigator;

