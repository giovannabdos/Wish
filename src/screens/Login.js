import React, {useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Image, View, Text} from 'react-native';
import {setUser, setToken} from '../redux/actions';
import Logo from '../assets/images/Logo.png';
import Input from '../components/Input';
import Button from '../components/Button';
import Local from '../services/Local';
import Device from '../services/Device';
import api from '../services/api';
import ErrorMessage from '../components/ErrorMessage';
import {maskCPF} from '../utils/masks';

function Login({setUser, setToken}) {
  const [login, setLogin] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const validateFields = () => {
    let validated = true;

    if (login === '') {
      setLoginErrorMessage('Campo obrigatório');
      validated = false;
    }

    if (password === '') {
      setPasswordErrorMessage('Campo obrigatório');
      validated = false;
    }

    return validated;
  };

  const signIn = async () => {
    try {
      setErrorMessage(null);

      if (!validateFields()) {
        return;
      }

      setIsLoading(true);

      const response = await api.post('/users/authenticate', {
        login,
        password,
      });

      const {user, token} = response.data;

      await Device.updateUser(user);
      await Local.setUser(user);
      await Local.setToken(token);
      setUser(user);
      setToken(token);
    } catch (response) {
      if (response?.data?.message) {
        setErrorMessage(response.data.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Faça seu Login e{'\n'}
            <Text style={[styles.title, styles.bold]}>Boas Vendas</Text>
          </Text>
        </View>

        <View style={styles.errorContainer}>
          <ErrorMessage message={errorMessage} />
        </View>

        <View style={styles.cpf}>
          <Input
            type="secondary"
            label={'CPF ou matrícula'}
            value={login}
            onChangeText={text => {
              setLoginErrorMessage(null);
              setLogin(maskCPF(text));
            }}
            keyboardType={'numeric'}
            errorMessage={loginErrorMessage}
          />
        </View>
        <View style={styles.senha}>
          <Input
            type="secondary"
            label={'Senha'}
            secureTextEntry={true}
            value={password}
            onChangeText={text => {
              setPasswordErrorMessage(null);
              setPassword(text);
            }}
            autoCapitalize={'none'}
            errorMessage={passwordErrorMessage}
          />
        </View>
        <Text style={styles.text}>Esqueceu a Senha?</Text>

        <Button
          type="tertiary"
          text={'Entrar'}
          onPress={() => signIn()}
          loading={isLoading}
        />
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
    flex: 0.4,
    justifyContent: 'center',
  },
  logo: {
    width: 102.6584,
    height: 130,
    alignSelf: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginBottom: 10,
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
  },
  errorContainer: {
    marginBottom: 10,
  },
  cpf: {
    fontFamily: 'Montserrat',
    color: '#FFFFFF',
  },
  senha: {
    marginTop: 24,
    fontFamily: 'Montserrat',
    color: '#FFFFFF',
  },
  text: {
    marginTop: 15,
    color: '#FFFFFF',
    alignSelf: 'flex-end',
    marginBottom: 50,
    fontFamily: 'Montserrat',
  },
});

function mapStateToProps(state) {
  return {store: state};
}

export default connect(mapStateToProps, {setUser, setToken})(Login);
