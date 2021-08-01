import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function ErrorMessage({message}) {
  return !!message && <Text style={styles.text}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: '#FF80AB',
    fontFamily: 'Montserrat',
  },
});
