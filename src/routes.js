import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import MeusDesejos from './screens/MeusDesejos';
import DesejoDetalhes from './screens/DesejoDetalhes';
import OutrosDesejos from './screens/OutrosDesejos';
import Consultas from './screens/Consultas';
import AddDesejo from './screens/AddDesejo';
import Settings from './screens/Settings';
import Mais from './screens/Mais';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Local from './services/Local';
import {setUser, setToken} from './redux/actions';
import SplashScreen from './components/SplashScreen';
import {defaultHeader} from './utils/globalStyles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function OutrosDesejosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OtherDesires"
        component={OutrosDesejos}
        options={{
          ...defaultHeader,
          headerLeft: () => null,
          headerTitle: 'Outros Desejos',
        }}
      />
      <Stack.Screen
        name="MyDesiresDetails"
        component={DesejoDetalhes}
        options={{
          ...defaultHeader,
          headerTitle: 'Detalhes do Desejo',
        }}
      />
    </Stack.Navigator>
  );
}

function MeusDesejosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyDesires"
        component={MeusDesejos}
        options={{
          ...defaultHeader,
          headerLeft: () => null,
          headerTitle: 'Meus Desejos',
        }}
      />
      <Stack.Screen
        name="MyDesiresDetails"
        component={DesejoDetalhes}
        options={{...defaultHeader, headerTitle: 'Detalhes do Desejo'}}
      />
    </Stack.Navigator>
  );
}

function AddDesejoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddDesejo"
        component={AddDesejo}
        options={{
          ...defaultHeader,
          headerLeft: () => null,
          headerTitle: 'Cadastrar Desejo',
        }}
      />
    </Stack.Navigator>
  );
}

function ConsultasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reports"
        component={Consultas}
        options={{
          ...defaultHeader,
          headerLeft: () => null,
          headerTitle: 'Consultas',
        }}
      />
    </Stack.Navigator>
  );
}

function MaisStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={Mais}
        options={{
          ...defaultHeader,
          headerLeft: () => null,
          headerTitle: 'Mais',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{...defaultHeader, headerTitle: 'Configurações'}}
      />
    </Stack.Navigator>
  );
}

/* <Tab.Navigator
activeColor="#193E5B"
inactiveColor="#B0AEAE"
barStyle={{
  backgroundColor: '#ffffff',
  fontSize: 10,
  color: '#193E5B',
}}>
</Tab.Navigator>; */

function Tabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#193E5B',
        inactiveTintColor: '#B0AEAE',
        labelStyle: {
          fontSize: 8,
          fontFamily: 'Montserrat',
        },
      }}>
      <Tab.Screen
        name="Outros Desejos"
        component={OutrosDesejosStack}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="store" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meus Desejos"
        component={MeusDesejosStack}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="heart" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cadastrar"
        component={AddDesejoStack}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="plus" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Consultas"
        component={ConsultasStack}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="chart-line" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Mais"
        component={MaisStack}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="ellipsis-h" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          ...defaultHeader,
          headerTitle: 'Esqueceu a Senha?',
        }}
      />
    </Stack.Navigator>
  );
}

function Routes({store, setUser, setToken}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserLoggedIn();
  }, []);

  const getUserLoggedIn = async () => {
    setIsLoading(true);

    setTimeout(async () => {
      token = await Local.getToken();
      user = await Local.getUser();
      if (user && token) {
        setUser(user);
        setToken(user);
      }

      setIsLoading(false);
    }, 2000);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return <>{store.token && store.user ? <Tabs /> : <LoginStack />}</>;
}

function mapStateToProps(state) {
  return {store: state};
}

export default connect(mapStateToProps, {setUser, setToken})(Routes);
