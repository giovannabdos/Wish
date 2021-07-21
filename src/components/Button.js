import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function Button({text, type, onPress}) {
  const [backgroundColor, setBackgroundColor] = useState('#193E5B');
  const [color, setColor] = useState('#ffffff');
  const [borderColor, setBorderColor] = useState('#193E5B');

  useEffect(() => {
    if (type === 'secondary') {
      setBackgroundColor('#f2f2f2');
      setColor('#193E5B');
    } else if (type == 'tertiary') {
      setBackgroundColor('#FFFFFF');
      setColor('#193E5B');
      setBorderColor('#ffffff');
    }
  }, []);

  return (
    <View style={[styles.container, {backgroundColor, borderColor}]}>
      <TouchableOpacity>
        <Text style={[styles.text, {color}]} onPress={onPress}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 2,
  },
  text: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
