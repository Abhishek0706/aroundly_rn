import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import StartupScreen from '../screens/StartupScreen';
import NewEventScreen from '../screens/NewEventScreen';
import AuthNavigator from './AuthNavigator';

import {createStackNavigator} from '@react-navigation/stack';
import {Text, Linking} from 'react-native';

const Stack = createStackNavigator();

const MainNavigator = () => {
  // Deep Linking
  const [data, setData] = useState(null);
  const handelDeepLink = event => {
    const data = event.url;
    setData(data);
  };

  useEffect(() => {
    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setData(initialUrl);
      }
    };
    const removeListner = Linking.addEventListener('url', handelDeepLink);
    if (!data) {
      getInitialUrl();
    }
    return () => {
      removeListner.remove();
    };
  }, []);

  const linking = {
    prefixes: ['aroundly://app'],
    config: {
      screens: {
        NewEventScreen: 'newevent',
      },
    },
  };

  const didTryAutoLogin = useSelector(state => state.user.didTryAutoLogin);

  const appNavigator = () =>
    didTryAutoLogin ? <AuthNavigator /> : <StartupScreen />;

  const newEventScreen = () => <NewEventScreen data={data} />;

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator>
        <Stack.Screen
          name="appNavigator"
          component={appNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewEventScreen"
          component={newEventScreen}
          options={{headerBackTitleVisible: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
