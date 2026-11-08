
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

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

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={['top', 'bottom', 'left', 'right']}
      >
        <Text style={styles.title}>
          🐶 Random Dog Gallery
        </Text>

        <Text style={styles.subtitle}>
          Discover adorable dogs from around the world!
        </Text>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#6C63FF" />
            <Text style={styles.message}>
              Loading dog images...
            </Text>
          </View>

        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.error}>
              Error: {error}
            </Text>
          </View>

        ) : (
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1FF',
    paddingHorizontal: 15,
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
