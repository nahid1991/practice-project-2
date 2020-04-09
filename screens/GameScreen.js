import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert, Dimensions } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../components/CustomText";

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
	const [currentGuesses, setCurrentGuesses] = useState([
		generateRandomBetween(1, 100, props.userChoice)
	]);
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
		Dimensions.get("window").width
	);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get("window").height
	);

	const [rounds, setRounds] = useState(0);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get("window").width);
			setAvailableDeviceHeight(Dimensions.get("window").height);
		};

		Dimensions.addEventListener("change", updateLayout);

		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	useEffect(() => {
		if (currentGuesses[0] === props.userChoice) {
			props.onGameOver(rounds, currentGuesses);
		}
	}, [currentGuesses, props.userChoice, props.onGameOver, rounds]);

	const nextGuessHandler = direction => {
		if (
			(direction === "lower" && currentGuesses[0] < props.userChoice) ||
			(direction === "greater" && currentGuesses[0] > props.userChoice)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry", style: "cancel" }
			]);
			return;
		}

		if (direction === "lower") {
			currentHigh.current = currentGuesses[0];
		} else {
			currentLow.current = currentGuesses[0];
		}

		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuesses[0]
		);
		setCurrentGuesses([nextNumber, ...currentGuesses]);
		setRounds(currentRounds => {
			return currentRounds + 1;
		});
	};

	let numbersAndButtons = (
		<View
			style={{
				flexDirection: "column",
				alignItems: "center",
				width: "100%"
			}}
		>
			<CustomText style={Styles.title}>Opponent's Guess</CustomText>
			<NumberContainer>{currentGuesses[0]}</NumberContainer>
			<Card
				styles={{
					...Styles.buttonContainer,
					marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
					width: "80%"
				}}
			>
				<CustomButton
					onPress={nextGuessHandler.bind(this, "lower")}
					color={Colors.accent}
					font="saira-stencil"
				>
					<Ionicons name="md-remove" size={24} />
				</CustomButton>
				<CustomButton
					onPress={nextGuessHandler.bind(this, "greater")}
					color={Colors.primary}
					font="saira-stencil"
				>
					<Ionicons name="md-add" size={24} />
				</CustomButton>
			</Card>
		</View>
	);

	if (availableDeviceHeight <= availableDeviceWidth) {
		numbersAndButtons = (
			<View
				style={{
					flexDirection: "column",
					alignItems: "center",
					width: "40%"
				}}
			>
				<CustomText style={Styles.title}>Opponent's Guess</CustomText>
				<View
					style={{
						...Styles.inputContainer,
						width: Dimensions.get("window").width / 2
					}}
				>
					<CustomButton
						onPress={nextGuessHandler.bind(this, "lower")}
						color={Colors.accent}
						font="saira-stencil"
						style={{ marginHorizontal: 20 }}
					>
						<Ionicons name="md-remove" size={24} />
					</CustomButton>
					<NumberContainer>{currentGuesses[0]}</NumberContainer>
					<CustomButton
						onPress={nextGuessHandler.bind(this, "greater")}
						color={Colors.primary}
						font="saira-stencil"
						style={{ marginHorizontal: 20 }}
					>
						<Ionicons name="md-add" size={24} />
					</CustomButton>
				</View>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={{flex: 1}}>
			<View
				style={
					availableDeviceHeight <= availableDeviceWidth
						? Styles.screenLandscape
						: Styles.screen
				}
			>
				{numbersAndButtons}
				<View
					style={
						availableDeviceHeight <= availableDeviceWidth
							? {
									...Styles.guessContainerLandscape,
									maxHeight: Dimensions.get("window").height * 0.6
							  }
							: {
									...Styles.guessContainer,
									width: "80%",
									maxHeight: "60%",
									height: Dimensions.get("window").height * 0.45
							  }
					}
				>
					<ScrollView
						contentContainerStyle={
							availableDeviceHeight <= availableDeviceWidth
								? {
										width: Dimensions.get("window").width * 0.5,
										...Styles.scrollLandscape,
                    flexGrow: 1
								  }
								: {
										width: Dimensions.get("window").width / 1.4,
                    height: Dimensions.get('window').height * 0.45,
										...Styles.scroll,
                    flexGrow: 1
								  }
						}
					>
						{currentGuesses.map((guess, i) => {
							return (
								<Card
									styles={
										availableDeviceHeight <= availableDeviceWidth
											? Styles.guessCountLandscape
											: Styles.guessCount
									}
									key={i}
								>
									<CustomText>#{rounds - i + 1}</CustomText>
									<CustomText>{guess}</CustomText>
								</Card>
							);
						})}
					</ScrollView>
				</View>
			</View>
		</ScrollView>
	);
};

const Styles = StyleSheet.create({
  title: {
		fontSize: 20,
		marginVertical: 10
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	screenLandscape: {
		flex: 1,
		flexDirection: "row",
		padding: 10,
		alignItems: "center"
	},
	guessContainerLandscape: {
		flexGrow: 1,
		width: "60%",
		marginVertical: 25,
		alignItems: "center",
		backgroundColor: "#ddd",
		borderRadius: 20
	},
	guessContainer: {
		flexGrow: 1,
		marginVertical: 10,
		alignItems: "center",
		backgroundColor: "#ddd",
		borderRadius: 20
	},
	scroll: {
		flexGrow: 1,
		justifyContent: "flex-end",
		alignItems: "center"
	},
	scrollLandscape: {
		flexGrow: 1,
		justifyContent: "flex-end",
		alignItems: "center"
	},
	guessCount: {
		marginVertical: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%"
	},
	guessCountLandscape: {
		marginVertical: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	},
	screen: {
		flex: 1,
		flexDirection: "column",
		padding: 10,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around"
	}
});

export default GameScreen;
