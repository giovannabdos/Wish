import React from 'react';
import {StyleSheet, Image, View, Text, Dimensions} from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';

export default function Mais() {
  return (
    <Container>
      <Text style={{fontSize: 50}}>Mais</Text>
      <Button type="primary" text={'Continuar'} />
      <Button type="secondary" text={'Continuar'} />
      <Button type="tertiary" text={'Continuar'} />
    </Container>
  );
}

const styles = StyleSheet.create({});
