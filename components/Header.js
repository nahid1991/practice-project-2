import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/colors";
import CustomText from "./CustomText";

const Header = props => {
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

	return (
		<View
			style={{
				...Styles.header,
				height: availableDeviceHeight <= availableDeviceWidth ? 60 : 90,
				paddingTop: availableDeviceHeight <= availableDeviceWidth ? 30 : 36
			}}
		>
			<CustomText style={Styles.headerTitle}>{props.title}</CustomText>
		</View>
	);
};

const Styles = StyleSheet.create({
	header: {
		width: "100%",
		backgroundColor: Colors.primary,
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
