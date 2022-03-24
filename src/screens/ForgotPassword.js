import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Button from '../components/Button';
import Input from '../components/Input';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';

const forgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo Obrigatório'),
});

function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = async (values, {setSubmitting, setErrors, resetForm}) => {
    try {
      setErrorMessage(null);
      setSubmitting(true);

      await api.post('/users/reset-password', values);

      setSuccessMessage(
        'Um e-mail com o link para redefinição de sua senha foi enviado com sucesso, cheque sua caixa de entrada!',
      );
      setSubmitting(false);
      resetForm({});
    } catch (response) {
      if (response?.data?.message) {
        setErrorMessage(response.data.message);
      } else if (response?.data?.errors) {
        setErrors(response.data.errors);
      } else {
        setErrorMessage('Houve um erro inesperado, tente novamente');
      }
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {successMessage ? (
        <>
          <Text style={[styles.text, styles.successMessage]}>
            {successMessage}
          </Text>
          <Button
            text={'Tentar Novamente'}
            type="secondary"
            onPress={() => setSuccessMessage(null)}
          />
        </>
      ) : (
        <>
          <Text style={styles.text}>
            Digite seu e-mail de recuperação, em seguida você receberá um e-mail
            com o link para redefinição de sua senha
          </Text>

          <Formik
            initialValues={{email: ''}}
            onSubmit={onSubmit}
            validationSchema={forgotPasswordFormSchema}>
            {({
              values,
              errors,
              isSubmitting,
              touched,
              handleChange,
              handleSubmit,
            }) => (
              <>
                <View style={{marginBottom: 14}}>
                  <Input
                    type="primary"
                    label={'E-mail de recuperação'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    errorMessage={
                      touched?.email && errors?.email && errors.email
                    }
                  />
                </View>

                <View style={styles.errorContainer}>
                  <ErrorMessage message={errorMessage} />
                </View>

                <Button
                  text={'Continuar'}
                  onPress={handleSubmit}
                  loading={isSubmitting}
                />
              </>
            )}
          </Formik>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    flex: 0.7,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginBottom: 30,
    color: '#888888',
  },
  errorContainer: {
    marginBottom: 14,
  },
  successMessage: {
    color: '#193E5B',
  },
});

export default ForgotPassword;
