import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProductPicker({}) {
  return (
    <>
      <View style={styles.container2}>
        <MaterialCommunityIcons
          name="camera-plus"
          size={80}
          style={{marginLeft: 14}}
          color={'#979191'}
          style={styles.camera}
        />
        <Text style={styles.text}>Tire uma foto do produto</Text>
        <Text style={styles.text2}>ou da etiqueta</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container2: {
    borderWidth: 3,
    borderRadius: 10,
    marginTop: 10,
    borderStyle: 'dashed',
    borderColor: '#979191',
    marginTop: 20,
  },
  camera: {
    marginTop: 167,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    marginTop: 9,
    fontSize: 19,
    fontFamily: 'Montserrat',
  },
  text2: {
    marginBottom: 104,
    alignSelf: 'center',
    fontSize: 19,
    fontFamily: 'Montserrat',
  },
});
