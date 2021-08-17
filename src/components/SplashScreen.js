import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Logo from '../assets/images/Logo.png';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#193E5B',
    width: '100%',
    paddingHorizontal: 20,
    flex: 1,
  },
  logoContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  logo: {
    width: 240,
    height: 200,
    alignSelf: 'center',
  },
});
