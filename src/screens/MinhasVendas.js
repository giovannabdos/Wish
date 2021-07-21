import React from 'react';
import {StyleSheet, Image, View, Text, Dimensions} from 'react-native';
import Input from '../components/Input';
import Container from '../components/Container';

export default function MinhasVendas() {
  return (
    <Container>
      <Input type="primary" label={'Desejo'} />
    </Container>
  );
}

const styles = StyleSheet.create({});
