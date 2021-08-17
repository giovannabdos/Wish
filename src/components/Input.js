import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import ErrorMessage from './ErrorMessage';

export default function Input({
  label,
  secureTextEntry,
  type,
  errorMessage,
  ...props
}) {
  const [color, setColor] = useState('#000000');
  const [borderColor, setBorderColor] = useState('#979191');
  const [errorColor, setErrorColor] = useState('#dd2c00');

  useEffect(() => {
    if (type === 'secondary') {
      setColor('#FFFFFF');
      setBorderColor('#ffffff');
      setErrorColor('#FF80AB');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={[styles.label, {color: !!errorMessage ? errorColor : color}]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {borderColor: !!errorMessage ? errorColor : borderColor, color},
        ]}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {!!errorMessage && (
        <View style={styles.errorMessageContainer}>
          <ErrorMessage type={type} message={errorMessage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontFamily: 'Montserrat',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#979191',
    fontSize: 16,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginBottom: 3,
    fontFamily: 'Montserrat',
    textAlignVertical: 'top',
  },
  errorMessageContainer: {
    marginTop: 3,
  },
});
