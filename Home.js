import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setStars(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={stars}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.starContainer}
            onPress={() => navigation.navigate('StarDetail', { star: item })}
          >
            <Text style={styles.starName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const StarDetailScreen = ({ navigation }) => {
  const star = navigation.getParam('star');

  return (
    <View style={styles.container}>
      <Text style={styles.starName}>{star.name}</Text>
      <Text style={styles.starInfo}>Mass: {star.mass}</Text>
      <Text style={styles.starInfo}>Radius: {star.radius}</Text>
      <Text style={styles.starInfo}>Temperature: {star.temperature}</Text>
    </View>
  );
};

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  StarDetail: StarDetailScreen,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  starName: {
    fontSize: 18,
  },
  starInfo: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
});

export default createAppContainer(AppNavigator);
