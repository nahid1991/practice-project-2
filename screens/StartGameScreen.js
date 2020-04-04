import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import CustomButton from "../components/CustomButton";
import {MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";

const StartGameScreen = props => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetButtonHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	const confirmButtonHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid number!",
				"Number has to be a number between 1 to 99.",
				[{ text: "Okay", style: "destructive", onPress: resetButtonHandler }]
			);
			Keyboard.dismiss();
			return;
		}
		setConfirmed(true);
		setSelectedNumber(parseInt(enteredValue));
		setEnteredValue("");
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card styles={Styles.summaryContainer}>
				<Text style={{fontFamily: "saira-stencil"}}>You Chose</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<CustomButton
					onPress={() => props.onStartGame(selectedNumber)}
					color={Colors.primary}
          font="saira-stencil"
				>
					<SimpleLineIcons name="control-play" size={24}/>
				</CustomButton>
				{/* <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/> */}
			</Card>
		);
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={Styles.screen}>
				<Text style={Styles.title}>Start a New Game!</Text>
				<Card styles={Styles.inputContainer}>
					<Text style={{fontFamily: "saira-stencil"}}>Select a Number</Text>
					<Input
						style={Styles.input}
						blurOnSubmit
						autoCapitalize="none"
						keyboardType="number-pad"
						maxLength={2}
						value={enteredValue}
						onChangeText={numberInputHandler}
					/>
					<View style={Styles.buttonContainer}>
						<View style={Styles.button}>
							<CustomButton onPress={resetButtonHandler} color={Colors.accent} font="saira-stencil">
              <MaterialIcons name="clear" size={24}/>
							</CustomButton>
						</View>
						<View style={Styles.button}>
							<CustomButton onPress={confirmButtonHandler} color={Colors.primary} font="saira-stencil">
               <MaterialIcons name="check" size={24}/>
							</CustomButton>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

const Styles = StyleSheet.create({
	inputContainer: {
		width: 300,
		maxWidth: "80%",
		alignItems: "center",
	},
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
		justifyContent: "flex-start"
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "saira-stencil"
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
    paddingHorizontal: 15,
	},
	button: {
		width: "50%"
	},
	input: {
		width: 50,
    textAlign: "center",
    fontFamily: "saira-stencil"
	},
	summaryContainer: {
		marginTop: 30,
		alignItems: "center"
	}
});

export default StartGameScreen;
