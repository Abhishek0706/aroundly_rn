import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default props => (
  <Text style={{...styles.poppins, ...props.style}}>{props.children}</Text>
);

const styles = StyleSheet.create({
  poppins: {
    fontFamily: 'Poppins-Regular',
  },
});
