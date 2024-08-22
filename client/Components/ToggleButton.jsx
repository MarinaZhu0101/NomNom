import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ToggleButton = ({ style = 'pill', onToggle }) => {
  const [isRestro, setIsRestro] = useState(false);

  const toggleView = () => {
    setIsRestro(!isRestro);
    onToggle(!isRestro);
  };

  if (style === 'pill') {
    return (
      <View style={styles.pillContainer}>
        <TouchableOpacity
          style={[styles.pillButton, isRestro ? styles.pillActive : null]}
          onPress={toggleView}
        >
          <Text style={[styles.pillText, isRestro ? styles.pillTextActive : null]}>Restro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pillButton, !isRestro ? styles.pillActive : null]}
          onPress={toggleView}
        >
          <Text style={[styles.pillText, !isRestro ? styles.pillTextActive : null]}>Noms</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.toggleContainer} onPress={toggleView}>
      <View style={[styles.toggleOption, isRestro ? styles.activeOption : null]}>
      <MaterialCommunityIcons name="storefront-outline" size={20} color={isRestro ? "#E65100" : "#6e6e6e"} />
        <Text style={styles.toggleText}>Restro</Text>
      </View>
      <View style={[styles.toggleOption, !isRestro ? styles.activeOption : null]}>
        <MaterialCommunityIcons name="bowl-mix-outline" size={20} color={!isRestro ? "#E65100" : "#6e6e6e"} />

        <Text style={styles.toggleText}>Noms</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#DADADA',
    borderRadius: 25,
    
    ...Platform.select({
      ios: {
        shadowColor: '#221C19',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  toggleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
  },
  activeOption: {
    backgroundColor: '#FFFFFF',
  },
  toggleText: {
    marginLeft: 5,
    fontFamily: 'Ubuntu-Medium',
    fontSize:12,
  },
  pillContainer: {
    flexDirection: 'row',
    borderWidth:1,
    borderColor:'#FFA500',
    borderRadius: 25,
  },
  pillButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  pillActive: {
    backgroundColor: '#FFA500',
  },
  pillText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize:16,
  },
  pillTextActive: {
    color: '#221C19',
  },
});

export default ToggleButton;