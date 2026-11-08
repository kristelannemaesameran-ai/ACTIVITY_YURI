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

      // Check whether the API request succeeded
      if (!response.ok) {
        throw new Error('Failed to fetch dog images.');
      }

      // Convert the response into JSON
      const result = await response.json();

      // Save the returned image URLs
      setDogs(result.message);

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