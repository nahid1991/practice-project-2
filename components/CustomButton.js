import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";

const CustomButton = props => {
	return (
		<TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
			<View style={
        {
          backgroundColor: Platform.OS === 'ios' ? '' : props.color,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
          ...props.style
        }
      }>
        <Text style={
          {
            color: Platform.OS === 'ios' ? props.color : 'white',
            fontFamily: props.font,
            fontSize: 18,
            textAlign: 'center'
          }
        }>
          {props.children}
        </Text>
      </View>
		</TouchableOpacity>
	);
};

export default CustomButton;
