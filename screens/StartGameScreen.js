import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Card from "../components/Card";

const StartGameScreen = props => {
  return (
    <View style={Styles.screen}>
      <Text style={Styles.title}>Start a New Game!</Text>
      <Card styles={Styles.inputContainer}>
        <Text>Select a Number</Text>
        <View style={Styles.input}>
          <TextInput />
        </View>
        <View style={Styles.buttonContainer}>
          <View style={Styles.button}>
            <Button title={"Reset"} onPress={() => {}} color="#c717fc" />
          </View>
          <View style={Styles.button}>
            <Button title={"Confirm"} onPress={() => {}} color="#f7287b" />
          </View>
        </View>
      </Card>
    </View>
  );
};

const Styles = StyleSheet.create({
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 20
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    width: "50%"
  }
});

export default StartGameScreen;
