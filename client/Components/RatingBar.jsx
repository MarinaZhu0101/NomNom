import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RatingBar = ({ rating, category, startColor, endColor }) => {
  const filledWidth = `${(rating / 5) * 100}%`;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{category}</Text>
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.barContainer}>
        <LinearGradient
          colors={[startColor, endColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.filledBar, { width: filledWidth }]}
        />
        <View style={styles.emptyBar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontFamily:'Ubuntu-Regular'
  },
  rating: {
    fontSize: 14,
    fontFamily:'Ubuntu-Regular'
  },
  barContainer: {
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    overflow: 'hidden',
  },
  filledBar: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  emptyBar: {
    flex: 1,
  },
});

export default RatingBar;