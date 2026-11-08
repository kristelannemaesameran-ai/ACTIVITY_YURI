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

  // Store the fetched dog images
  const [dogs, setDogs] = useState([]);

  // Track the loading status
  const [loading, setLoading] = useState(true);

  // Store possible error messages
  const [error, setError] = useState('');

  return (
    <SafeAreaView>
      <View>
        <Text>🐶 Random Dog Gallery</Text>
        <Text>Discover adorable dogs from around the world!</Text>
      </View>
    </SafeAreaView>
  );
}