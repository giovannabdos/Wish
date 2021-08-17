import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function ContentEmpty({text}) {
  return (
    <View style={styles.container}>
      <SimpleLineIcons name={'exclamation'} size={45} color={'#B0B0B0'} />
      <Text style={styles.titulto}>{text}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulto: {
    color: '#B0B0B0',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
  },
});
