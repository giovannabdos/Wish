import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';

export default function Product({text, image}) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{text}</Text>
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
  title: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 14,
    marginVertical: 5,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
