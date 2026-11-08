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
  return (
    <SafeAreaView>
      <View>
        <Text>🐶 Random Dog Gallery</Text>
        <Text>Discover adorable dogs from around the world!</Text>
      </View>
    </SafeAreaView>
  );
}