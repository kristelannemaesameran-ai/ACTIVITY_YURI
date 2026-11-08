
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

  // Store the dog images received from the API
  const [dogs, setDogs] = useState([]);

  // Track whether the API is still loading
  const [loading, setLoading] = useState(true);

  // Store an error message if the request fails
  const [error, setError] = useState('');

  // Function for retrieving random dog images
  const fetchDogs = async () => {
    try {

      // Send a GET request to the Dog CEO API
      const response = await fetch(
        'https://dog.ceo/api/breeds/image/random/10'
      );

      // Check if the API request was successful
      if (!response.ok) {
        throw new Error('Failed to fetch dog images.');
      }

      // Convert the API response into JavaScript data
      const result = await response.json();

      // Save the returned dog image URLs
      setDogs(result.message);

    } catch (error) {

      // Handle errors during the API request
      setError(error.message);

    } finally {

      // Stop loading after the request finishes
      setLoading(false);
    }
  };

  // Fetch dog images automatically when the app opens
  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      {/* Application heading */}
      <Text style={styles.title}>
        🐶 Random Dog Gallery
      </Text>

      <Text style={styles.subtitle}>
        Discover adorable dogs from around the world!
      </Text>

      {/* Check the current API request status */}
      {loading ? (

        // Loading indicator
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.message}>
            Loading dog images...
          </Text>
        </View>

      ) : error ? (

        // Error message
        <View style={styles.center}>
          <Text style={styles.error}>
            Error: {error}
          </Text>
        </View>

      ) : (

        // Display the fetched dog images
        <FlatList
          data={dogs}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => (
            <View style={styles.card}>

              <Image
                source={{ uri: item }}
                style={styles.image}
                resizeMode="cover"
              />

              <Text style={styles.dogName}>
                Dog #{index + 1}
              </Text>

            </View>
          )}
        />
      )}

    </SafeAreaView>
  );
}

// Application layout and visual design
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F1FF',
    padding: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5145A5',
    marginTop: 15,
  },

  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#5145A5',
  },

  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginVertical: 8,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },

  dogName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5145A5',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },

});
