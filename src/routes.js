import React from 'react';
import {connect} from 'react-redux';
import Login from './screens/Login';
import MeusDesejos from './screens/MeusDesejos';
import MeusDesejosDetalhes from './screens/MeusDesejosDetalhes';
import OutrosDesejos from './screens/OutrosDesejos';
import MinhasVendas from './screens/MinhasVendas';
import AddDesejo from './screens/AddDesejo';
import Mais from './screens/Mais';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function OutrosDesejosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Outros Desejos"
        component={OutrosDesejos}
        options={{headerLeft: () => null}}
      />
    </Stack.Navigator>
  );
}

function MeusDesejosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Meus Desejos"
        component={MeusDesejos}
        options={{headerLeft: () => null}}
      />
      <Stack.Screen name="Desejos" component={MeusDesejosDetalhes} />
    </Stack.Navigator>
  );
}

function AddDesejoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cadastrar Desejo"
        component={AddDesejo}
        options={{headerLeft: () => null}}
      />
    </Stack.Navigator>
  );
}

function MinhasVendasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Minhas Vendas"
        component={MinhasVendas}
        options={{headerLeft: () => null}}
      />
    </Stack.Navigator>
  );
}

function MaisStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mais"
        component={Mais}
        options={{headerLeft: () => null}}
      />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      activeColor="#193E5B"
      inactiveColor="#B0AEAE"
      barStyle={{
        backgroundColor: '#ffffff',
        fontSize: 10,
        color: '#193E5B',
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
        name="Minhas Vendas"
        component={MinhasVendasStack}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="donate" size={20} color={color} />
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
    </Stack.Navigator>
  );
}

function Routes({store}) {
  return <>{store.token && store.user ? <Tabs /> : <LoginStack />}</>;
}

function mapStateToProps(state) {
  return {store: state};
}

export default connect(mapStateToProps, {})(Routes);
