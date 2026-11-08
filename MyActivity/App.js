
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
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
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar backgroundColor="#FFF0F5" barStyle="dark-content" />

        <View style={styles.header}>
          <Text style={styles.emoji}>🐶</Text>
          <Text style={styles.title}>Puppy Gallery</Text>
          <Text style={styles.subtitle}>
            A little happiness in every picture
          </Text>

          <View style={styles.countContainer}>
            <Text style={styles.countText}>
              {dogs.length} Adorable Puppies
            </Text>
          </View>
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#E75480" />
            <Text style={styles.message}>
              Finding adorable puppies...
            </Text>
          </View>

        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.error}>Oops! {error}</Text>
          </View>

        ) : (
          <FlatList
            data={dogs}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <Image
                  source={{ uri: item }}
                  style={styles.image}
                  resizeMode="cover"
                />

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.dogName}>
                      Lovely Puppy #{index + 1}
                    </Text>
                    <Text style={styles.dogSubtitle}>
                      Made with love ♡
                    </Text>
                  </View>

                  <Text style={styles.heart}>♥</Text>
                </View>
              </View>
            )}
          />
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ♡ for dog lovers
          </Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    paddingHorizontal: 18,
  },

  header: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 20,
  },

  emoji: {
    fontSize: 42,
    marginBottom: 5,
  },

  title: {
    fontSize: 29,
    fontWeight: '900',
    color: '#D6336C',
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 13,
    color: '#B84D75',
    marginTop: 5,
  },

  countContainer: {
    backgroundColor: '#FFD6E5',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 15,
  },

  countText: {
    color: '#C2185B',
    fontSize: 12,
    fontWeight: 'bold',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    marginTop: 12,
    fontSize: 15,
    color: '#D6336C',
    fontWeight: '600',
  },

  error: {
    color: '#C2185B',
    fontSize: 15,
    textAlign: 'center',
  },

  list: {
    paddingBottom: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 18,
    elevation: 4,
    shadowColor: '#D6336C',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  image: {
    width: '100%',
    height: 210,
    borderRadius: 14,
    backgroundColor: '#FFD6E5',
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  dogName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C2185B',
  },

  dogSubtitle: {
    fontSize: 11,
    color: '#D88AA5',
    marginTop: 3,
  },

  heart: {
    fontSize: 25,
    color: '#E75480',
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  footerText: {
    fontSize: 11,
    color: '#C45B80',
    fontWeight: '600',
  },
});
