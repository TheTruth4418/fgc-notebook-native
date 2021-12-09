import store from './redux/store'
import { Provider } from 'react-redux';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './navigation/Home';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Home/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
