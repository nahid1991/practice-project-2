import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
	return Font.loadAsync({
		"saira-stencil": require("./assets/fonts/SairaStencil.ttf")
	});
};

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [guesses, setGuesses] = useState([]);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
			/>
		);
	}

	const configureNewGameHandler = () => {
		setGuessRounds(0);
		setUserNumber(null);
	};

	const startGameHandler = selectedNumber => {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	};

	const gameOverHandler = (rounds, guesses) => {
    setGuessRounds(rounds);
    setGuesses([...guesses]);
	};

	let content = <StartGameScreen onStartGame={startGameHandler} />;

	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				userNumber={userNumber}
				guessRounds={guessRounds}
				onRestart={configureNewGameHandler}
        guesses={guesses}
			/>
		);
	}

	return (
		<View style={styles.container}>
			<Header title="Guess a Number" />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
