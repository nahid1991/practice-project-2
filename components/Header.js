import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = props => {
  return (
    <View style={Styles.header}>
      <Text style={Styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: "#f7287b",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default Header;
