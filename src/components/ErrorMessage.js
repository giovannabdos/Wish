import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';

export default function ErrorMessage({message, type}) {
  const [errorColor, setErrorColor] = useState('#dd2c00');

  useEffect(() => {
    if (type === 'secondary') {
      setErrorColor('#FF80AB');
    }
  }, []);

  return (
    !!message && (
      <Text style={[styles.text, {color: errorColor}]}>{message}</Text>
    )
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat',
  },
});
