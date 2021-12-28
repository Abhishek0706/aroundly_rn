import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const MarkerView = ({name = 'Hritik', image}) => {
  return (
    <View style={styles.markerContainer}>
      <View style={styles.markerImageContainer}>
        <Image
          source={
            !!image
              ? {uri: image}
              : require('../assets/Hrithik-Roshan-Image.png')
          }
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
    height: 35,
    width: 35,
    borderRadius: 17,
    overflow: 'hidden',
  },
  markerImage: {
    height: '100%',
    width: '100%',
  },
  markerText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MarkerView;
