import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {didTryAutoLogin, login, logout} from '../store/actions/auth';

const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        dispatch(logout());
      } else {
        const transformedData = JSON.parse(userData);
        dispatch(
          login(
            transformedData.name,
            transformedData.email,
            transformedData.dob,
          ),
        );
      }
      dispatch(didTryAutoLogin());
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default StartupScreen;
