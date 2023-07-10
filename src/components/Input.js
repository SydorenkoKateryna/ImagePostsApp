import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({
  isFocusedInput,
  isLastInput = false,
  placeholder,
  autoComplete,
  secureTextEntry = false,
  onFocus,
  onBlur,
  value,
  onChangeText,
}) => {
  const { input, lastInput } = styles;
  return (
    <TextInput
      style={
        isFocusedInput
          ? [
              input,
              isLastInput ? lastInput : null,
              {
                borderColor: "#FF6C00",
                backgroundColor: "#ffffff",
              },
            ]
          : [input, isLastInput ? lastInput : null]
      }
      placeholder={placeholder}
      placeholderTextColor={"#BDBDBD"}
      autoComplete={autoComplete}
      secureTextEntry={secureTextEntry}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Roboto_400Regular",
    color: "#212121",
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  lastInput: {
    marginBottom: 0,
  },
});
export default Input;
