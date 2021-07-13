import React from 'react';
import Login from './screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import MeusDesejos from './screens/MeusDesejos';
import OutrosDesejos from './screens/OutrosDesejos';
import MinhasVendas from './screens/MinhasVendas';
import Mais from './screens/Mais';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#193E5B"
        inactiveColor="#B0AEAE"
        barStyle={{
          backgroundColor: '#ffffff',
          fontSize: 10,
          color: '#193E5B',
        }}>
        {/* <Tab.Screen name="Login" component={Login} /> */}
        <Tab.Screen
          name="Outros Desejos"
          component={OutrosDesejos}
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="store" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Meus Desejos"
          component={MeusDesejos}
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome name="heart" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Minhas Vendas"
          component={MinhasVendas}
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="donate" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Mais"
          component={Mais}
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="ellipsis-h" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
