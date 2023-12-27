import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MusicPlayer from './components/MusicPlayer';

const  App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <MusicPlayer/>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
