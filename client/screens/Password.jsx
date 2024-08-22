import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Feather } from '@expo/vector-icons';

const Password = ({navigation}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    return(
        <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
        <ImageBackground source={require('../assets/geometric-background.jpg')} style={styles.background}>
          <TouchableOpacity style={styles.skip}>
            <Text style={styles.skipText} onPress={() => navigation.navigate('Home')}>Skip</Text>
          </TouchableOpacity>
          <View style={styles.topSection}>
            <Image source={require('../assets/nomnom_logo.png')} style={styles.logo}/>
          </View>
  
          <View style={styles.loginCard}>
              <View style={styles.middleSection}>
                  <Text style={styles.titleOne}>Reset Your Password</Text>
                  <Text style={styles.titleTwo}>The password must be different than before</Text>
                  <View style={styles.inputOne}>
                    <View style={styles.lock}>
                        <Feather name='lock' size={20} color={'rgb(100,100,100)'}/>
                    </View>
                    <TextInput style={styles.input} value={newPassword} placeholder='New password' onChangeText={setNewPassword} />
                  </View>
                  <View style={styles.inputTwo}>
                    <View style={styles.lock}>
                        <Feather name='lock' size={20} color={'rgb(100,100,100)'}/>
                    </View>
                    <TextInput style={styles.input} value={confirmedPassword} placeholder='Confirm password' onChangeText={setConfirmedPassword} secureTextEntry/>
                  </View>
              </View>
  
              <View style={styles.middleSecond}>
                  <TouchableOpacity style={styles.signin} onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.textSign}>
                        Reset Password
                      </Text>
                  </TouchableOpacity>
              </View>
  
              <View style={styles.bottomSection}>
                  <TouchableOpacity style={styles.createAc} onPress={() => navigation.navigate('Login')}>
                    <Icon name="arrow-left" size={20} color="grey" />
                      <Text style={styles.textAc}>
                          Back to Login
                      </Text>
                  </TouchableOpacity>
              </View>
          </View>
        </ImageBackground>
        </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
}

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
      fontSize: 12,
      color: 'rgb(150,150,150)',
      marginTop: 15,
      marginBottom: 20
    },
    input:{
      fontSize:15,
      height: 40,
      width: '80%',
      paddingHorizontal: 5,
      borderBottomWidth: 2,
      borderColor: 'rgb(180,180,180)',
      color: '#616161',
      fontFamily: 'Ubuntu_Regular', 
      fontSize: 14,
      marginBottom: 15,
    },
    middleSecond:{
      paddingHorizontal: 35
    },
    inputOne:{
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 5
    },
    inputTwo: {
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 5,
    },
    lock: {
        paddingTop: 10,
        paddingRight: 5
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
      color: '#838383',
      paddingLeft: 5,
    },
    textAcTwo:{
      fontSize: 14,
      fontFamily: 'Ubuntu_Regular',
      color: '#FF7B00',
      marginLeft: 5
    },
    bottomSection:{
      alignItems: 'center',
      marginBottom: 20,
    }, 
  });

export default Password