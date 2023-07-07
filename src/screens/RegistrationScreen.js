import React, { useState } from "react";
import {
  SafeAreaView,
  ImageBackground,
  StatusBar,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import InputButton from "../components/InputButton";
import { useKeyboardVisible } from "../hooks/Keyboard";
import { Feather } from "@expo/vector-icons";

const RegistrationScreen = () => {
  const {
    container,
    imageBackground,
    contentWrapper,
    formContainer,
    imageWrapper,
    imageStyles,
    imageButton,
    formTitle,
    textWrapper,
    text,
    textUnderline,
  } = styles;

  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  ////////////////////////////////////--------->
  //   temporarily for layout and styling
  const [image, setImage] = useState(false);

  const handleAddImage = () => {
    setImage(true);
  };

  const handleDeleteImage = () => {
    setImage(false);
  };
  //<---------//////////////////////////////////

  const signIn = () => {
    console.debug("Welcome!");
  };

  const togglePasswordHide = () => {
    setIsPasswordHide(!isPasswordHide);
  };

  const handleFocus = (name) => {
    setIsFocused({
      [name]: true,
    });
  };

  const handleBlur = (name) => {
    setIsFocused({
      [name]: false,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={container}>
        <ImageBackground
          source={require("../../assets/auth-background.png")}
          resizeMode="cover"
          style={imageBackground}
        >
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <View
            style={[
              contentWrapper,
              useKeyboardVisible() ? { height: "72%" } : { height: "68%" },
            ]}
          >
            <View style={imageWrapper}>
              {image && <Image style={imageStyles} />}
              {image ? (
                <TouchableOpacity
                  style={[
                    imageButton,
                    { backgroundColor: "#ffffff", borderRadius: 50 },
                  ]}
                  onPress={handleDeleteImage}
                >
                  <Feather name="x-circle" size={25} color="#BDBDBD" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={imageButton} onPress={handleAddImage}>
                  <Feather name="plus-circle" size={25} color="#FF6C00" />
                </TouchableOpacity>
              )}
            </View>
            <View style={formContainer}>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <Text style={formTitle}>Реєстрація</Text>
                <View>
                  <Input
                    isFocusedInput={isFocused.name}
                    placeholder={"Логін"}
                    autoComplete={"name"}
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                  />
                </View>

                <View>
                  <Input
                    isFocusedInput={isFocused.email}
                    placeholder={"Адреса електронної пошти"}
                    autoComplete={"email"}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                  />
                </View>

                <View>
                  <Input
                    isFocusedInput={isFocused.password}
                    isLastInput={true}
                    placeholder={"Пароль"}
                    autoComplete={"password"}
                    secureTextEntry={isPasswordHide}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                  />

                  <InputButton
                    text={isPasswordHide ? "Показати" : "Приховати"}
                    onPress={togglePasswordHide}
                  />
                </View>

                {!useKeyboardVisible() && (
                  <View style={{ marginTop: 43 }}>
                    <Button text={"Зареєстуватися"} onPress={signIn} />

                    <View style={textWrapper}>
                      <Text style={text}>Вже є акаунт?</Text>
                      <Text style={[text, textUnderline]}>Увійти</Text>
                    </View>
                  </View>
                )}
              </KeyboardAvoidingView>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  contentWrapper: {
    height: "68%",
    width: "100%",
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
  },
  imageWrapper: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  imageStyles: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#212121",
  },
  imageButton: {
    position: "absolute",
    bottom: 14,
    right: -13,
  },
  formTitle: {
    marginBottom: 32,
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  textUnderline: {
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});

export default RegistrationScreen;
