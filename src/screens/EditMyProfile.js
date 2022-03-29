import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {setUser} from '../redux/actions';
import * as Yup from 'yup';
import {Formik} from 'formik';
import Container from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';
import Local from '../services/Local';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';

const editMyProfileFormSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Email inválido').nullable().notRequired(),
});

function EditMyProfile({store, navigation, setUser}) {
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmitEditMyProfile = async (values, {setSubmitting, setErrors}) => {
    try {
      setErrorMessage(null);
      setSubmitting(true);

      const response = await api.put('/users', values);

      const {user} = response.data;

      await Local.setUser(user);
      setUser(user);
      setSubmitting(false);
      navigation.navigate('MyProfile');
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
    <Container>
      <Formik
        initialValues={{name: store.user.name, email: store.user.email || null}}
        onSubmit={onSubmitEditMyProfile}
        validationSchema={editMyProfileFormSchema}>
        {({
          values,
          errors,
          isSubmitting,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <>
            <View>
              <View style={{marginBottom: 14}}>
                <Input
                  type="primary"
                  label={'Nome completo'}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  errorMessage={touched?.name && errors?.name && errors.name}
                />
              </View>
              <View style={{marginBottom: 14}}>
                <Input
                  type="primary"
                  label={'E-mail para recuperação de senha'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  errorMessage={touched?.email && errors?.email && errors.email}
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
            </View>
          </>
        )}
      </Formik>
    </Container>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    marginBottom: 10,
  },
});

function mapStateToProps(state) {
  return {store: state};
}

export default connect(mapStateToProps, {setUser})(EditMyProfile);
