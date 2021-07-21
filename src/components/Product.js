import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import Blusa from '../assets/images/Blusa.png';

export default function Product({text, image}) {
  console.log(image);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title1}>{text}</Text>
        <Image source={{uri: image}} style={styles.image} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 10,
  },

  title1: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 14,
    marginTop: 10,
    marginBottom: 6,
  },
  image: {
    width: '100%',
    height: 300,
  },
});
