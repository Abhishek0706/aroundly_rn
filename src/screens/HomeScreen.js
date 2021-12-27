import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useSelector, useDispatch} from 'react-redux';

import MarkerView from '../components/MarkerView';
import LogoutButton from '../components/LogoutButton';

import {logout} from '../store/actions/auth';

const HomeScreen = ({navigation, route}) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [granted, setGranted] = useState(true);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton onPress={logoutHandler} />,
    });
  }, [navigation]);

  useEffect(() => {
    let myInterval;
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth !== 'granted') {
          setGranted(false);
        }
      }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setGranted(false);
        }
      }
    };

    requestLocationPermission().then(() => {
      if (granted) {
        myInterval = setInterval(() => {
          Geolocation.getCurrentPosition(
            position => {
              setCurrentPosition(position);
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }, 1000);
      } else {
        console.log('Permission not granted');
      }
    });

    return () => {
      if (myInterval) clearInterval(myInterval);
    };
  }, []);

  if (currentPosition) {
    return (
      <View style={styles.screen}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: currentPosition.coords.latitude,
              longitude: currentPosition.coords.longitude,
            }}>
            <MarkerView name={user.name} />
          </Marker>
        </MapView>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'flex-start',
  },
});

export default HomeScreen;

// indore cordinates
// latitude: 22.7075,
// longitude: 75.8617,
