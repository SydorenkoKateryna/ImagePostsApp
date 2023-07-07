import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const InputButton = ({ text, onPress }) => {
  const { inputButton, inputButtonTitle } = styles;
  return (
    <TouchableOpacity style={inputButton} onPress={onPress}>
      <Text style={inputButtonTitle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputButton: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingTop: 14.3,
    paddingRight: 16,
  },
  inputButtonTitle: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
  },
});
export default InputButton;
