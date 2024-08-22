import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {  useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Feather name="arrow-left" size={24} color="#9e9e9e" />
            <Text style={styles.normalText}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  backButton:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:16,
    paddingVertical:6,
    gap:5,
  },

  normalText: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Medium',
    color: '#9e9e9e',
  },
})

export default BackButton
