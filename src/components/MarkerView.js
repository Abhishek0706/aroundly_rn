import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from '../components/UI/Text';

const MarkerView = ({name = 'Hritik', image}) => {
  return (
    <View style={styles.markerContainer}>
      <View style={styles.markerImageContainer}>
        <Image
          source={!!image ? {uri: image} : require('../assets/hritik.png')}
          style={styles.markerImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.markerText} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 2,
  },
  markerImage: {
    height: '100%',
    width: '100%',
  },
  markerText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default MarkerView;
