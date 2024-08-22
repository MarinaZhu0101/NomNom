import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground,Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [diningPreferences, setDiningPreferences] = useState([]);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:6868/auth/register', {
        username: name,
        email: email,
        password: password,
        ethnicity: ethnicity,
        dietary_restrictions: dietaryRestrictions,
        dining_preferences: diningPreferences
      });

      if (response.status === 201) {
        // Registration successful, navigate to Home or show a success message
        navigation.navigate('Home');
      }
    } catch (error) {
      // Show error message
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong!');
    }
  };

  const [currentCard, setCurrentCard] = useState(0)
  const cards = [
    {
        id: 1,
        title: 'Sign Up',
        description:'',
        next: true,
        prev: false,
    },
    {
        id: 2,
        title: 'What is your ethnicity ?',
        description: 'Knowing your ethnicity allows us to give more weight to your reviews for your cultural cuisine, ensuring more accurate recommendations.',
        next: true,
        prev: true,
      },
      {
        id: 3,
        title: 'Dietary restrictions',
        description: 'Do you have any dietary restrictions? If so, please let us know.',
        next: true,
        prev: true,
      },
      {
        id: 4,
        title: 'Dining Preferences',
        description: 'Please select the tags that best describe your dining preferences.(max 5)',
        next: true,
        prev: true,
      },
      {
        id: 5,
        title: '',
        description: 'Welcome on board! Start searching for your dining options!',
        next: true,
        prev: true,
      }
  ]

  const nextCard = () => {
    if (currentCard === cards.length - 1) {
        // navigation.navigate('Home');
        handleSignUp(); // Submit the form data on the last card
      } else {
        setCurrentCard((prevIndex) => (prevIndex + 1) % cards.length);
      }
  };
  const prevCard = () => {
    setCurrentCard((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const data = [
    { label: 'American', value: 'american' },
    { label: 'Chinese', value: 'chinese' },
    { label: 'Dutch', value: 'dutch' },
    { label: 'French', value: 'french' },
    { label: 'German', value: 'german' },
    { label: 'Indian', value: 'indian' },
    { label: 'Irish', value: 'irish' },
    { label: 'Japanese', value: 'japanese' },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const restrictions = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Gluten-Free', value: 'gluten-free' },
    { label: 'Nut-Free', value: 'nut-free' },
    { label: 'Low-Sodium', value: 'low-sodium' },
    { label: 'Paleo', value: 'paleo' },
  ];

  // const [selectedTags, setSelectedTags] = useState([]);
  const tagsData = ['Family-friendly', 'Fine-Dining', 'Date', 'Quick Bite', 'Buffet', 'BBQ', 'Brunch', 'Budget-friendly', 'Thai', 'Spanish', 'Street food', 'Italian'];
  const MAX_TAGS = 5;
  // const toggleTag = (tag) => {
  //   if (selectedTags.includes(tag)) {
  //     setSelectedTags(selectedTags.filter(t => t !== tag));
  //   } else {
  //       if (selectedTags.length < MAX_TAGS) {
  //           setSelectedTags([...selectedTags, tag]);
  //         }
  //   }
  // };
  const toggleTag = (tag) => {
    if (diningPreferences.includes(tag)) {
      setDiningPreferences(diningPreferences.filter(t => t !== tag));
    } else {
      if (diningPreferences.length < MAX_TAGS) {
        setDiningPreferences([...diningPreferences, tag]);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <ImageBackground source={require('../assets/gradient-abstract-background.jpg')} style={styles.background}>
        <View style={styles.topSection}>
          <TouchableOpacity style={styles.skip} onPress={()=>navigation.navigate('Home')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
            <Image source={require('../assets/nomnom_logo.png')} style={styles.logo}/>
          </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.titleContainer}>
                        <View style={styles.number}>
                            <Text style={styles.first}>{cards[currentCard].id}</Text>
                        </View>
                        <Text style={styles.cardTitle}>{cards[currentCard].title}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        {currentCard === 0 && (
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="What is your name"
                                    value={name}
                                    placeholderTextColor={'#9e9e9e'}
                                    onChangeText={setName}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={email}
                                    placeholderTextColor={'#9e9e9e'}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    value={password}
                                    placeholderTextColor={'#9e9e9e'}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>
                        )}
                        {currentCard === 1 && (
                            <View style={styles.ethContainer}>
                                <Text style={styles.ethText}>
                                    {cards[currentCard].description}
                                </Text>
                                <View style={styles.dropContainer}>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        data={data}
                                        search
                                        maxHeight={210}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Select your ethnicity' : '...'}
                                        searchPlaceholder="Search..."
                                        // value={value}
                                        value={ethnicity} 
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            // setValue(item.value);
                                            setEthnicity(item.value);  // Update state
                                            setIsFocus(false);
                                        }}
                                    />
                                </View>
                            </View>
                        )}
                        {currentCard === 2 && (
                            <View style={styles.resContainer}>
                                <Text style={styles.ethText}>
                                    {cards[currentCard].description}
                                </Text>
                                <View style={styles.dropContainer}>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'black' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        data={restrictions}
                                        search
                                        maxHeight={210}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Select your restriction' : '...'}
                                        searchPlaceholder="Search..."
                                        value={dietaryRestrictions}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            // setValue(item.value);
                                            setDietaryRestrictions(item.value);  // Update state
                                            setIsFocus(false);
                                        }}
                                    />
                                </View>
                            </View>
                        )}
                        {currentCard === 3 && (
                            <View style={styles.tagContainer}>
                                <Text style={styles.descriptionTag}>
                                    {cards[currentCard].description}
                                </Text>
                                {tagsData.map((tag) => (
                                    <TouchableOpacity
                                        key={tag}
                                        style={[
                                            styles.tag,
                                            // selectedTags.includes(tag) && styles.selectedTag,
                                            diningPreferences.includes(tag) && styles.selectedTag,
                                        ]}
                                        onPress={() => toggleTag(tag)}
                                    >
                                        <Text style={[
                                            styles.tagText,
                                            // selectedTags.includes(tag) && styles.selectedTagText
                                            diningPreferences.includes(tag) && styles.selectedTagText
                                        ]}>
                                            {tag}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        {currentCard === 4 && (
                            <View style={styles.finalContainer}>
                                <Text style={styles.finalText}>
                                    {cards[currentCard].description}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        {cards[currentCard].prev && (
                            <View style={[styles.button, styles.prevButton]}>
                                <TouchableOpacity style={styles.arrowPrev} onPress={prevCard}>
                                    <Icon name="arrow-left" size={20} color="black" />
                                </TouchableOpacity>
                                <Text style={styles.prevText}>Previous</Text>
                            </View>
                        )}
                        {cards[currentCard].next && (
                            <View style={[styles.button, styles.nextButton]}>
                                <TouchableOpacity style={styles.arrowNext} onPress={nextCard}>
                                    <Icon name="arrow-right" size={20} color="black" />
                                </TouchableOpacity>
                                <Text style={styles.nextText}>{currentCard === cards.length - 1 ? 'Finish' : 'Next'}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </ImageBackground>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  safeArea: {
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
    logo: {
      width: 80,
      height: 80,
      borderRadius: 10,
      marginLeft: 20
    },
    cardContainer: {
      flex: 1,
      alignItems: 'center',
      marginVertical: 60
    },
    card: {
      width: '100%',
      width: 350,
      height: 380,
      padding: 20,
      borderRadius: 15,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    titleContainer: {
      flexDirection: 'row',
      marginTop: 12,
      marginBottom: 10
    },
    number:{
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 6,
      paddingBottom: 6,
      marginRight: 20,
      backgroundColor:'#FF9400',
      borderRadius: 30,
    },
    first:{
      fontSize: 15,
      fontFamily:'Ubuntu-Medium',
      color:'white'
    },
    cardTitle: {
      fontSize: 20,
      fontFamily:'Ubuntu-Medium',
    },
    contentContainer:{
      height: 250,
      alignItems:'center'
    },
    inputContainer: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 20
  },
    input:{
      fontSize:14,
      padding: 15,
      backgroundColor: 'white',
      shadowColor:'rgb(200,200,200)',
      shadowOffset:{
        width: 0,
        height:2
      },
      shadowOpacity: 0.6,
      shadowRadius: 3,
      width: '70%',
      borderRadius: 5,
      color:'black',
      marginBottom: 15,
      fontFamily:'Ubuntu-regular',
    },
    cardDescription: {
      fontSize: 16,
      fontFamily:'Ubuntu-regular',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 60
    },
    button: {
      position: 'absolute',
      bottom: 10,
      padding: 10,
    },
    prevButton: {
      left: 10,
    },
    nextButton: {
      right: 10,
    },
    arrowNext:{
      backgroundColor:'#FFB300',
      padding: 8,
      borderRadius: 50,
      marginBottom: 10
    },
    nextText: {
      fontsize: 13,
      fontFamily:'Ubuntu-Regular',
      textAlign:'center',
    },
    prevText:{
      fontsize: 13,
      fontFamily:'Ubuntu-Regular',
    },
    arrowPrev:{
      backgroundColor:'#FFB300',
      width:36,
      paddingLeft: 8,
      paddingVertical: 8,
      borderRadius: 50,
      marginBottom: 10,
    },
    ethContainer:{
      height: 200,
      maxWidth: 200
    },
    ethText:{
      color: 'rgb(100,100,100)',
      fontFamily:'Ubuntu-Regular',
      fontSize: 12
    },
    dropContainer:{
      marginTop: 40
    },
    dropdown:{
      backgroundColor: 'white',
      shadowColor: 'rbg(200,200,200)',
      shadowOffset:{
        width: 0,
        height:2
      },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      padding: 10,
      borderRadius: 10
    },
    placeholderStyle:{
      color: 'rgb(180, 180, 180)',
      fontSize: 13,
      fontFamily:'Ubuntu-Regular',
    },
    textStyle: {
      color: 'black',
      fontSize: 14,
      fontFamily: 'Ubuntu-Regular',
    },
    resContainer:{
      height: 200,
      width: 200
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 10,
    },
    tag: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'rgb(200,200,200)',
      borderRadius: 15,
      paddingLeft: 10,
      paddingRight: 10,
      paddingVertical: 5,
      margin: 5,
    },
    selectedTag: {
      backgroundColor: '#FFB300',
      borderColor: 'white',
      fontFamily: 'Ubuntu-Medium',
    },
    tagText: {
      color: 'rgb(150,150,150)',
      fontSize: 13,
      fontFamily:'Ubuntu-Regular',
    },
    selectedTagText: {
      color: 'white',
    },
    descriptionTag:{
      color: 'rgb(100,100,100)',
      fontFamily:'Ubuntu-Medium',
      fontSize: 14,
      marginBottom: 20,
      marginLeft: 10
    },
    finalContainer:{
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center'
    },
    finalText: {
      fontFamily:'Ubuntu-Bold',
      fontSize: 17,
      textAlign:'center'
    }
})

export default SignUpScreen;
