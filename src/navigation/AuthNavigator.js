import React from 'react';
import {useSelector} from 'react-redux';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const isAuth = useSelector(state => !!state.user.name);

  return (
    <Stack.Navigator>
      {isAuth && (
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Aroundly'}}
        />
      )}
      {!isAuth && (
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
