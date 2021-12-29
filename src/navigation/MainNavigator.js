import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';

import StartupScreen from '../screens/StartupScreen';
import NewEventScreen from '../screens/NewEventScreen';
import AuthNavigator from './AuthNavigator';

import {createStackNavigator} from '@react-navigation/stack';

import ShareMenu from 'react-native-share-menu';
import {View} from 'react-native';

const Stack = createStackNavigator();

const MainNavigator = () => {
  //share with
  const [sharedData, setSharedData] = useState(null);
  const [sharedMimeType, setSharedMimeType] = useState(null);
  const [sharedExtraData, setSharedExtraData] = useState(null);

  const handleShare = useCallback(item => {
    if (!item) {
      return;
    }
    const {mimeType, data, extraData} = item;

    setSharedData(data);
    setSharedExtraData(extraData);
    setSharedMimeType(mimeType);
  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, []);

  const saveComplete = () => {
    setSharedData(null);
    setSharedMimeType(null);
    setSharedExtraData(null);
  };

  const didTryAutoLogin = useSelector(state => state.user.didTryAutoLogin);
  const appNavigator = () =>
    didTryAutoLogin ? <AuthNavigator /> : <StartupScreen />;

  const newEventScreen = () => {
    if (!sharedData || !sharedMimeType) return <View></View>;
    return (
      <NewEventScreen
        data={sharedData}
        mimeType={sharedMimeType}
        extraData={sharedExtraData}
        onSaveComplete={saveComplete}
      />
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!sharedData && (
          <Stack.Screen
            name="appNavigator"
            component={appNavigator}
            options={{headerShown: false}}
          />
        )}
        {sharedData && (
          <Stack.Screen
            name="NewEventScreen"
            component={newEventScreen}
            options={{title: 'Save Link to Aroundly', headerTitleAlign: 'left'}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
