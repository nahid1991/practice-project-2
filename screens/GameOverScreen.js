import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Colors from "../constants/colors";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import CustomButton from "../components/CustomButton";

const GameOverScreen = props => {
	return (
		<View style={Styles.screen}>
			<Text style={{ fontFamily: "saira-stencil" }}>The game is over!</Text>
			<View style={Styles.imageContainer}>
				<Image
					source={require("../assets/original.png")}
					style={Styles.image}
					resizeMode="cover"
				/>
			</View>
			<Text style={{ fontFamily: "saira-stencil" }}>Number of rounds: </Text>
			<NumberContainer>{props.guessRounds}</NumberContainer>
			<Text style={{ fontFamily: "saira-stencil" }}>Number was: </Text>
			<NumberContainer>{props.userNumber}</NumberContainer>
      <CustomButton onPress={props.onRestart} color={Colors.primary}>
        START NEW GAME
      </CustomButton>
		</View>
	);
};

const Styles = StyleSheet.create({
	image: {
		width: "100%",
		height: "100%"
	},
	imageContainer: {
		height: 300,
		width: 300,
		borderWidth: 3,
		borderColor: "black",
		borderRadius: 150,
		overflow: "hidden"
	},
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cardCenter: {
		justifyContent: "center",
		alignItems: "center"
	}
});

export default GameOverScreen;
