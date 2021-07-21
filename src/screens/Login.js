import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import Logo from '../assets/images/Logo.png';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>Faça seu Login e</Text>
        <Text style={styles.title2}>Boas-Vendas</Text>
      </View>
      <View style={styles.cpf}>
        <Input type="secondary" label={'CPF ou matrícula'} />
      </View>
      <View style={styles.senha}>
        <Input type="secondary" label={'Senha'} secureTextEntry={true} />
      </View>
      <Text style={styles.text}>Esqueceu a Senha?</Text>
      <View style={styles.button}>
        <Button type="tertiary" text={'Entrar'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#193E5B',
    width: '100%',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginLeft: 21,
    fontFamily: 'Montserrat',
  },
  title2: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
    marginLeft: 8,
  },
  logo: {
    marginTop: 28,
    marginLeft: 140,
    marginBottom: 33,
  },
  cpf: {
    marginTop: 29,
    marginLeft: 21,
    fontFamily: 'Montserrat',
    color: '#FFFFFF',
  },
  senha: {
    marginTop: 24,
    fontFamily: 'Montserrat',
    marginLeft: 21,
    color: '#FFFFFF',
  },
  text: {
    marginTop: 15,
    color: '#FFFFFF',
    alignSelf: 'flex-end',
    marginRight: 19,
    marginBottom: 50,
    fontFamily: 'Montserrat',
  },
  button: {
    marginLeft: 21,
    marginRight: 19,
    marginBottom: 300,
  },
});
