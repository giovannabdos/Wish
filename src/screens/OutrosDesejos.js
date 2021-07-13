import React from 'react';
import {StyleSheet, Image, View, Text, Dimensions} from 'react-native';

export default function OutrosDesejos() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 50}}>Outros Desejos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containe: {
    backgroundColor: '#193E5B',
    flex: 1,
  },
});
