import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default function Button({text, type, onPress, loading}) {
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
    <View style={{opacity: loading ? 0.5 : 1}}>
      <TouchableOpacity
        style={[styles.container, {backgroundColor, borderColor}]}
        onPress={onPress}>
        {loading ? (
          <ActivityIndicator color={color} size={24} />
        ) : (
          <Text style={[styles.text, {color}]}>{text}</Text>
        )}
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
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
});
