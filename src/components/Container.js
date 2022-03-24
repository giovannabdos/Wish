import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

export default function Container({
  component = ScrollView,
  children,
  ...props
}) {
  const Component = component;

  return (
    <Component style={styles.container} {...props}>
      {children}
    </Component>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
});
