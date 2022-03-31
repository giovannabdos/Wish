import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {setUser} from '../redux/actions';
import * as Yup from 'yup';
import {Formik} from 'formik';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import SelectPhoto from '../components/SelectPhoto';
import ErrorMessage from '../components/ErrorMessage';
import api from '../services/api';
import Local from '../services/Local';
import {maskCPF} from '../utils/masks';

const changePhotoFormSchema = Yup.object().shape({
  photo: Yup.object()
    .shape({
      uri: Yup.string(),
    })
    .typeError('Imagem obrigatória'),
});

function MyProfile({navigation, store, setUser}) {
  const [photo, setPhoto] = useState(store.user.photo);
  const [errorMessage, setErrorMessage] = useState(null);

  const SelectPhotoRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <Feather
            name="edit-2"
            size={26}
            color="#fff"
            onPress={() => navigation.navigate('EditMyProfile')}
          />
        </View>
      ),
    });
  }, []);

  const cpfMasked = useMemo(() => {
    return maskCPF(store.user.cpf);
  }, [store.user.cpf]);

  const onSubmitChangePhoto = async (values, {setSubmitting, setErrors}) => {
    try {
      setErrorMessage(null);
      setSubmitting(true);

      let formData = new FormData();
      formData.append('user[photo]', values.photo);

      const response = await api.put('/users', formData);

      const {user} = response.data;

      await Local.setUser(user);
      setUser(user);
      setPhoto(user.photo)
      setSubmitting(false);
    } catch (response) {
      if (response?.data?.message) {
        setErrorMessage(response.data.message);
      } else if (response?.data?.errors) {
        setErrors(response.data.errors);
      } else {
        setErrorMessage(
          'Houve um erro inesperado, tente alterar sua foto novamente',
        );
      }
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.top} />
      <Formik
        initialValues={{photo: store.user.photo}}
        onSubmit={onSubmitChangePhoto}
        validationSchema={changePhotoFormSchema}>
        {({
          errors,
          isSubmitting,
          touched,
          setFieldValue,
          setFieldTouched,
          handleSubmit,
        }) => (
          <>
            <TouchableOpacity
              onPress={() => SelectPhotoRef?.current?.setVisible(true)}
              style={styles.containerAvatar}>
              {isSubmitting && (
                <View style={styles.containerLoading}>
                  <ActivityIndicator size={190} color="#2DB83D" />
                </View>
              )}

              {photo ? (
                <Image source={{uri: photo}} style={styles.avatar} />
              ) : (
                <View style={styles.avatar}>
                  <FontAwesome
                    name="user"
                    size={120}
                    color={'#979191'}
                    style={styles.emptyAvatar}
                  />
                </View>
              )}

              <SelectPhoto
                ref={SelectPhotoRef}
                onChange={image => {
                  setFieldValue('photo', image);
                  setFieldTouched('photo', true);
                  setPhoto(image.uri);
                  handleSubmit();
                }}
                resizeOptions={{
                  width: 300,
                  height: 300,
                }}
              />
            </TouchableOpacity>

            {touched?.photo && (errorMessage || errors?.photo) && (
              <View style={styles.errorContainer}>
                <ErrorMessage
                  message={errorMessage || errors?.photo}
                  textStyle={{textAlign: 'center'}}
                />
              </View>
            )}
          </>
        )}
      </Formik>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{store.user.name}</Text>
        {store.user.email && store.user.email !== '' && (
          <View style={[styles.itemRow, styles.spacingTop]}>
            <FontAwesome name="envelope-o" size={17} color={'#979191'} />
            <Text style={styles.cardText}>{store.user.email}</Text>
          </View>
        )}

        <View style={[styles.itemRow, styles.spacingTop]}>
          <Text style={styles.cpfTitle}>CPF</Text>
          <Text style={styles.cardText}>{cpfMasked}</Text>
        </View>
        <View style={styles.spacingTop}>
          <Text style={styles.sectionTitle}>Marca</Text>
          <Text style={[styles.cardText, {marginLeft: 0}]}>
            {store.user.brand.name}
          </Text>
        </View>
        <View style={styles.spacingTop}>
          <Text style={styles.sectionTitle}>Loja</Text>
          <Text style={[styles.cardText, {marginLeft: 0}]}>
            {store.user.store.name}
          </Text>
        </View>
        <View style={styles.largeSpacingTop} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  top: {
    backgroundColor: '#193E5B',
    width: '100%',
    height: 140,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  containerLoading: {
    position: 'absolute',
    marginTop: -20,
    marginLeft: -20,
  },
  containerAvatar: {
    alignSelf: 'center',
    marginTop: -80,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    elevation: 8,
  },
  avatar: {
    borderColor: '#FFF',
    borderWidth: 4,
    borderRadius: 100,
    backgroundColor: '#e6e6e6',
    width: 150,
    height: 150,
  },
  emptyAvatar: {
    alignSelf: 'center',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 14,
    margin: 10,
    marginTop: 20,
  },
  cardTitle: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  cardText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat',
    marginLeft: 7,
    alignItems: 'center',
  },
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacingTop: {
    marginTop: 5,
  },
  largeSpacingTop: {
    marginTop: 10,
  },
  cpfTitle: {
    color: '#979191',
    fontFamily: 'Montserrat',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
  },
  errorContainer: {
    marginTop: 8,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
});

function mapStateToProps(state) {
  return {store: state};
}

export default connect(mapStateToProps, {setUser})(MyProfile);
