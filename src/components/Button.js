import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ text, onPress }) => {
  const { button, buttonTitle } = styles;
  return (
    <TouchableOpacity style={button} onPress={onPress}>
      <Text style={buttonTitle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 51,
    padding: 16,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  buttonTitle: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#ffffff",
  },
});
export default Button;
