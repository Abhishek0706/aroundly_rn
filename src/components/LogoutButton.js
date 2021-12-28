import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../components/UI/Text';

const LogoutButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Logout</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
});

export default LogoutButton;
