import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const user = {
  point: '900',
  helpful: '68',
  reviews: '22',
  rated: '47',
}

const UserStats = () => {
  return (
    <View style={styles.container}>
      <StatItem title="Points" value={user.point} />
      <StatItem title="Helpful" value={user.helpful} />
      <StatItem title="Reviews" value={user.reviews} />
      <StatItem title="Rated" value={user.rated} />
    </View>
  );
};

const StatItem = ({ title, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: 14,
    color: '#888',
  },
});

export default UserStats;