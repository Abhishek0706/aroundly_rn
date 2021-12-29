import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default props => (
  <TextInput style={{...styles.poppins, ...props.style}} {...props} />
);

const styles = StyleSheet.create({
  poppins: {
    fontFamily: 'Poppins-Regular',
  },
});
