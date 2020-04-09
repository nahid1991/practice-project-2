import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import Colors from "../constants/colors";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";

const GameOverScreen = props => {
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
		Dimensions.get("window").width
	);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get("window").height
	);

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

	let wordContainer = (
		<View style={{alignItems: "center"}}>
			<CustomText style={Styles.title}>The game is over!</CustomText>
			<View
				style={{
					height: Dimensions.get("window").width * 0.3,
					width: Dimensions.get("window").width * 0.3,
					borderRadius: Dimensions.get("window").width * 0.15,
					...Styles.imageContainer
				}}
			>
				<Image
					source={require("../assets/original.png")}
					style={Styles.image}
					resizeMode="cover"
				/>
			</View>
			<CustomText>Number of rounds: {props.guessRounds + 1}</CustomText>
			<CustomText>The number was: {props.userNumber}</CustomText>
			<CustomText>Guesses that were made!</CustomText>
		</View>
	);

	let guessContainer = (
		<View
			style={{
        flexGrow: 1,
				width: "80%",
        alignItems: "center"
			}}
		>
			<View style={{...Styles.guessContainer, flex: 1}}>
				<ScrollView
					contentContainerStyle={{
						...Styles.scroll,
						width: Dimensions.get("window").width / 1.3
					}}
				>
					{props.guesses.reverse().map((guess, i) => {
            let j = i;
						return (
							<Card styles={Styles.guessCount} key={j}>
								<CustomText>#{i + 1}</CustomText>
								<CustomText>{guess}</CustomText>
							</Card>
						);
					})}
				</ScrollView>
			</View>
			<CustomButton
				onPress={props.onRestart}
				color={Colors.primary}
				font="saira-stencil"
        style={{width: "70%"}}
			>
				START NEW GAME
			</CustomButton>
		</View>
	);

	if (availableDeviceHeight <= availableDeviceWidth) {
		wordContainer = (
			<View style={Styles.wordContainer}>
				<CustomText style={Styles.title}>The game is over!</CustomText>
				<View
					style={{
						...Styles.imageContainerLandscape,
						height: Dimensions.get("window").width * 0.2,
						width: Dimensions.get("window").width * 0.2,
						borderRadius: Dimensions.get("window").width * 0.1
					}}
				>
					<Image
						source={require("../assets/original.png")}
						style={Styles.image}
						resizeMode="cover"
					/>
				</View>
				<CustomText>Number of rounds: {props.guessRounds + 1}</CustomText>
				<CustomText>The number was: {props.userNumber}</CustomText>
				<CustomText>Guesses that were made!</CustomText>
			</View>
		);

		guessContainer = (
			<View style={Styles.resultContainer}>
				<View
					style={{
						...Styles.guessContainerLandscape,
						maxHeight: Dimensions.get("window").height * 0.6
					}}
				>
					<ScrollView contentContainerStyle={Styles.scrollLandscape}>
						{props.guesses.reverse().map((guess, i) => {
							let j = i;
							return (
								<Card styles={{...Styles.guessCount}} key={j}>
									<CustomText>#{j + 1}</CustomText>
									<CustomText>{guess}</CustomText>
								</Card>
							);
						})}
					</ScrollView>
				</View>
				<CustomButton
					onPress={props.onRestart}
					color={Colors.primary}
					font="saira-stencil"
				>
					START NEW GAME
				</CustomButton>
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
				{wordContainer}
				{guessContainer}
			</View>
		</ScrollView>
	);
};

const Styles = StyleSheet.create({
	title: {
		fontSize: 20,
		marginVertical: 10
	},
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20
	},
	screenLandscape: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		justifyContent: "space-evenly"
	},
	resultContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "60%",
		marginRight: 30
	},
	wordContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		width: "40%"
	},
	guessContainer: {
    flexGrow: 1,
		alignItems: "center",
		backgroundColor: "#ddd",
		borderRadius: 20
	},
	guessContainerLandscape: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: "#ddd",
		borderRadius: 20,
		marginVertical: 20
	},
	scroll: {
		flexGrow: 1,
		alignItems: "center"
	},
	scrollLandscape: {
		flexGrow: 1,
		width: "100%",
		alignItems: "center"
	},
	image: {
		width: "100%",
		height: "100%"
	},
	imageContainerLandscape: {
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: 10
	},
	imageContainer: {
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: 10
	},
	cardCenter: {
		justifyContent: "center",
		alignItems: "center"
	},
	guessCount: {
		marginVertical: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%"
	}
});

export default GameOverScreen;
