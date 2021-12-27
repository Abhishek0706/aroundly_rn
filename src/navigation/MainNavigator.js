import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';

import StartupScreen from '../screens/StartupScreen';
import AuthNavigator from './AuthNavigator';

const MainNavigator = () => {
  const didTryAutoLogin = useSelector(state => state.user.didTryAutoLogin);

  return (
    <NavigationContainer>
      {didTryAutoLogin && <AuthNavigator />}
      {!didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default MainNavigator;
