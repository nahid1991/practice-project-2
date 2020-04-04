import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import {Ionicons} from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNumber = Math.floor(Math.random() * (max - min)) + min;

	if (rndNumber === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNumber;
	}
};

const GameScreen = props => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, props.userChoice)
	);

	const [rounds, setRounds] = useState(0);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		if (currentGuess === props.userChoice) {
			props.onGameOver(rounds);
		}
	}, [currentGuess, props.userChoice, props.onGameOver, rounds]);

	const nextGuessHandler = direction => {
		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "greater" && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry", style: "cancel" }
			]);
			return;
		}

		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}

		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setRounds(currentRounds => currentRounds + 1);
	};

	return (
		<View style={Styles.screen}>
			<Text style={Styles.title}>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card styles={Styles.buttonContainer}>
				<CustomButton
					onPress={nextGuessHandler.bind(this, "lower")}
					color={Colors.accent}
					font="saira-stencil"
				>
					<Ionicons name="md-remove" size={24}/>
				</CustomButton>
				<CustomButton
					onPress={nextGuessHandler.bind(this, "greater")}
					color={Colors.primary}
					font="saira-stencil"
				><Ionicons name="md-add" size={24}/></CustomButton>
			</Card>
		</View>
	);
};

const Styles = StyleSheet.create({
	title: {
		fontFamily: "saira-stencil"
	},
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 300,
		maxWidth: "80%"
	}
});

export default GameScreen;
