import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../components/UI/Text';
import TextInput from '../components/UI/TextInput';

const introText =
  'Save links from anywhere on internet with location and drop them inside Aroundly to turn them into your personal wishlist of places';

const NewEventScreen = ({data, mimeType, extraData, onSaveComplete}) => {
  const [inputLink, setInputLink] = useState(data);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [granted, setGranted] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
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
        Geolocation.getCurrentPosition(
          position => {
            setCurrentPosition(position.coords);
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Permission not granted');
      }
    });
  }, []);

  if (saved) {
    setTimeout(onSaveComplete, 100);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.introText}>{introText}</Text>
      <TextInput
        style={styles.textInput}
        value={inputLink}
        onChange={setInputLink}
      />
      <View style={{...styles.textInput, ...styles.locationContainer}}>
        <Text style={styles.boldText}>Latitude:</Text>
        <Text style={styles.coordinate} numberOfLines={1}>
          {currentPosition ? currentPosition.latitude : 'x'}
        </Text>
        <Text style={styles.boldText}>Longitude:</Text>
        <Text style={styles.coordinate} numberOfLines={1}>
          {currentPosition ? currentPosition.longitude : 'x'}
        </Text>
      </View>
      {currentPosition && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={Region => {
            setCurrentPosition(Region);
          }}>
          <Marker
            coordinate={{
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            }}
          />
        </MapView>
      )}
      <View style={styles.logoutButtonContainer}>
        <Button
          title="Save location"
          onPress={() => {
            console.log(currentPosition);
            saveDataToStorage(inputLink, currentPosition);
            setSaved(true);
          }}
        />
      </View>
    </View>
  );
};

const saveDataToStorage = async (inputLink, currentPosition) => {
  const raw = await AsyncStorage.getItem('favourites');
  if (!raw) fav = {};
  else fav = JSON.parse(raw);
  console.log(fav);
  const nextKey = Object.keys(fav).length;
  fav[nextKey] = {inputLink, currentPosition};
  console.log(fav);
  await AsyncStorage.setItem('favourites', JSON.stringify(fav));
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  introText: {
    textAlign: 'justify',
    color: '#444',
  },
  textInput: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    height: 45,
    width: '100%',
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    height: 45,
  },
  coordinate: {
    width: 50,
    flex: 1,
    marginHorizontal: 5,
  },
  boldText: {
    color: 'black',
  },
  map: {
    width: '100%',
    flex: 1,
  },
  logoutButtonContainer: {
    width: '100%',
    marginVertical: 10,
  },
});

export default NewEventScreen;
