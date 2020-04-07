import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
  return <TextInput {...props} style={{...Style.input, ...props.style}} />;
};

const Style = StyleSheet.create({
  input: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginTop: 10
  }
});

export default Input;