import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const NumberContainer = props => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.number}>{props.children}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  number: {
    color: Colors.accent,
    fontSize: 22,
    fontFamily: "saira-stencil"
  }
});

export default NumberContainer;
