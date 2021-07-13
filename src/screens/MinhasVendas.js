import React from 'react';
import {StyleSheet, Image, View, Text, Dimensions} from 'react-native';

export default function MinhasVendas() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 50}}>Minhas vendas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containe: {
    backgroundColor: '#193E5B',
    flex: 1,
  },
});
