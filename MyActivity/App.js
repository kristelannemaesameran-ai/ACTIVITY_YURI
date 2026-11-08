import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function App() {

  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Create an asynchronous function for fetching dog data
  const fetchDogs = async () => {
    try {

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>🐶 Random Dog Gallery</Text>
        <Text>Discover adorable dogs from around the world!</Text>
      </View>
    </SafeAreaView>
  );
}