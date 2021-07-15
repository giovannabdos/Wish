import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Container({children}) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
});
