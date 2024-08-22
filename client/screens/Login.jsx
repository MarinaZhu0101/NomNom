import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import { AuthContext } from '../Context/AuthContext'; 
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };

    login(userData); 
    navigation.navigate('Home');
  };

  const handleForget = () => {
    navigation.navigate('Password');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/geometric-background.jpg')} style={styles.background}>
        <TouchableOpacity style={styles.skip} onPress={()=>navigation.navigate('Home')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.topSection}>
          <Image source={require('../assets/nomnom_logo.png')} style={styles.logo}/>
        </View>

        <View style={styles.loginCard}>
            <View style={styles.middleSection}>
                <Text style={styles.titleOne}>HELLO</Text>
                <Text style={styles.titleTwo}>Login to your account</Text>
                <TextInput style={styles.input} value={email} placeholder='Email' onChangeText={setEmail} keyboardType="email-address"/>
                <TextInput style={styles.input} value={password} placeholder='Password' onChangeText={setPassword} secureTextEntry/>
            </View>

            <View style={styles.middleSecond}>
                <View style={styles.forgetWord}>
                <TouchableOpacity onPress={handleForget}>
                    <Text style={styles.password}>
                        Forget your password ?
                    </Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.signin} onPress={handleLogin}>
                    <Text style={styles.textSign}>
                    Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton}>
                    <Image source={require('../assets/google.jpg')} style={styles.google}/>
                    <Text style={styles.googleText}>Continue with Google</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.createAc} onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.textAc}>
                        Don't have an account yet?
                    </Text>
                    <Text style={styles.textAcTwo}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
      </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  skip:{
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: 'grey',
    opacity: 0.6,
    width: 70,
    borderRadius: 20,
    marginLeft: 300,
    marginTop: 20
  },
  skipText:{
    fontFamily: 'Ubuntu_Regular',
    fontSize: 14,
    color: 'white'
  },
  topSection:{
    alignItems: 'center'
  },
  logo:{
    width: 80,
    height: 80,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  loginCard:{
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset:{
        width: 1,
        height: 4
    },
    shadowOpacity: 0.4,
    shadowRadius: 3
  },
  middleSection:{
    alignItems:'center',
    marginTop: 25,
  },
  titleOne:{
    fontFamily: 'Ubuntu_Bold',
    fontSize: 20
  },
  titleTwo:{
    fontFamily: 'Ubuntu_Medium',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 20
  },
  input:{
    fontSize:15,
    height: 40,
    width: '80%',
    paddingHorizontal: 5,
    borderBottomWidth: 2,
    borderColor: 'rgb(200,200,200)',
    color: '#616161',
    fontFamily: 'Ubuntu_Regular', 
    fontSize: 14,
    marginBottom: 15,
  },
  middleSecond:{
    paddingHorizontal: 35
  },
  forgetWord:{
    alignSelf:'flex-end',
  },
  password:{
    fontSize: 12,
    color: 'rgba(97, 97, 97, 0.50)',
    fontFamily:'Ubuntu_Medium'
  },
  signin:{
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#E65100',
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 30,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset : {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  textSign: {
    fontSize: 16,
    fontFamily:'Ubuntu_Medium',
    color: 'white',
    textAlign: 'center',
  },
  googleButton:{
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: 'rgb(100, 100, 100)',
    shadowOffset : {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  google:{
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  googleText:{
    fontSize: 16,
    fontFamily:'Ubuntu_Medium',
    color: 'black',
    paddingLeft: 10
  },
  createAc: {
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  textAc:{
    fontSize: 14,
    fontFamily: 'Ubuntu_Regular',
    color: '#838383'
  },
  textAcTwo:{
    fontSize: 14,
    fontFamily: 'Ubuntu_Regular',
    color: '#FF7B00',
    marginLeft: 5
  },
  bottomSection:{
    alignItems: 'center',
    marginVertical: 20,
  }, 
});

export default LoginScreen;
