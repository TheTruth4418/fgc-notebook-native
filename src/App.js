import store from './redux/store'
import { Provider } from 'react-redux';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './navigation/Home';
import { useEffect } from 'react';

export default function App() {

  useEffect(() => {
    //check for a token
  });

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
/*     flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', */
  },
});
