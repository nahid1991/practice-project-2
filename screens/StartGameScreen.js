import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import CustomButton from "../components/CustomButton";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import CustomText from "../components/CustomText";

const StartGameScreen = props => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4);

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetButtonHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
  };
  
  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

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
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: "100%"
					}}
				>
					<CustomText style={{ marginTop: 10, fontSize: 38 }}>
						You Chose
					</CustomText>
					<NumberContainer>{selectedNumber}</NumberContainer>
				</View>
				<CustomButton
					onPress={() => props.onStartGame(selectedNumber)}
					color={Colors.primary}
					font="saira-stencil"
				>
					<SimpleLineIcons name="control-play" size={24} />
				</CustomButton>
			</Card>
		);
	}

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={60}>
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}
				>
					<View style={Styles.screen}>
						<CustomText style={Styles.title}>Start a New Game!</CustomText>
						<Card styles={Styles.inputContainer}>
							<CustomText>Select a Number</CustomText>
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
								<View style={{width: buttonWidth}}>
									<CustomButton
										onPress={resetButtonHandler}
										color={Colors.accent}
										font="saira-stencil"
									>
										<MaterialIcons name="clear" size={24} />
									</CustomButton>
								</View>
								<View style={{width: buttonWidth}}>
									<CustomButton
										onPress={confirmButtonHandler}
										color={Colors.primary}
										font="saira-stencil"
									>
										<MaterialIcons name="check" size={24} />
									</CustomButton>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const Styles = StyleSheet.create({
	inputContainer: {
		width: "80%",
		maxWidth: "95%",
		minWidth: 300,
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
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15
	},
	input: {
		width: 50,
		textAlign: "center",
    fontFamily: "saira-stencil",
    marginVertical: 10
	},
	summaryContainer: {
		marginTop: 30,
		alignItems: "center",
		flexDirection: "column",
		width: 300,
		maxWidth: "80%",
		justifyContent: "space-between"
	}
});

export default StartGameScreen;
