import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ text, onPress, disabled }) => {
  const { button, buttonTitle } = styles;
  return (
    <TouchableOpacity
      style={[
        button,
        disabled
          ? { backgroundColor: "#F6F6F6" }
          : { backgroundColor: "#FF6C00" },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          buttonTitle,
          disabled ? { color: "#BDBDBD" } : { color: "#ffffff" },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 51,
    padding: 16,
    marginBottom: 16,
    borderRadius: 100,
  },
  buttonTitle: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
});
export default Button;
