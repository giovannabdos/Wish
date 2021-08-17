import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Container from '../components/Container';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const buttonWidth = (width - 45) / 3 < 120 ? (width - 45) / 3 : 120;

export default function Mais() {
  const navigation = useNavigation();

  return (
    <Container style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="chart-line" size={35} color="#4D4D4D" />
          <Text style={styles.text}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="user" size={35} color="#4D4D4D" />
          <Text style={styles.text}>Meu Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-sharp" size={35} color="#4D4D4D" />
          <Text style={styles.text}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: buttonWidth,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginVertical: 7.5,
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 7.5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    elevation: 8,
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    textAlign: 'center',
  },
});
