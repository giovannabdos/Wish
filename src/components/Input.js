import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {clockRunning} from 'react-native-reanimated';
import Blusa from '../assets/images/Blusa.png';

export default function Input({label, secureTextEntry, type, ...props}) {
  const [color, setColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#979191');

  useEffect(() => {
    if (type === 'secondary') {
      setColor('#FFFFFF');
      setBorderColor('#ffffff');
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color}]}>{label}</Text>
      <TextInput
        style={[styles.input, {borderColor, color}]}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 19,
    fontFamily: 'Montserrat',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#979191',
    fontSize: 16,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginBottom: 3,
    marginRight: 19,
    fontFamily: 'Montserrat',
    textAlignVertical: 'top',
  },
});
