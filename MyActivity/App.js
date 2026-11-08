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

  const fetchDogs = async () => {
    try {
      const response = await fetch(
        'https://dog.ceo/api/breeds/image/random/10'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch dog images.');
      }

      const result = await response.json();
      setDogs(result.message);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data once when the component mounts
  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>🐶 Random Dog Gallery</Text>
        <Text>Discover adorable dogs from around the world!</Text>
      </View>
    </SafeAreaView>
  );
}