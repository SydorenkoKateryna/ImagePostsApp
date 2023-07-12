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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import Button from "../components/Button";
import InputButton from "../components/InputButton";
import { useKeyboardVisible } from "../hooks/Keyboard";

const LoginScreen = () => {
  const {
    container,
    imageBackground,
    formContainer,
    formTitle,
    textWrapper,
    text,
    textUnderline,
  } = styles;

  const navigation = useNavigation();

  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClearState = () => {
    setEmail("");
    setPassword("");
  };

  const signIn = () => {
    if (!email || !password) {
      return console.warn("Будь ласка заповніть всі поля!");
    }

    console.log({ email, password });

    navigation.navigate("Home", { user: { email, password } });

    handleClearState();
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
              formContainer,
              useKeyboardVisible() ? { height: "48%" } : { height: "60%" },
            ]}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <Text style={formTitle}>Увійти</Text>
              <View>
                <Input
                  isFocusedInput={isFocused.email}
                  placeholder={"Адреса електронної пошти"}
                  autoComplete={"email"}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  value={email}
                  onChangeText={setEmail}
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
                  value={password}
                  onChangeText={setPassword}
                />

                <InputButton
                  text={isPasswordHide ? "Показати" : "Приховати"}
                  onPress={togglePasswordHide}
                />
              </View>

              {!useKeyboardVisible() && (
                <View style={{ marginTop: 43 }}>
                  <Button
                    text={"Увійти"}
                    onPress={signIn}
                    disabled={!email || !password}
                  />

                  <View style={textWrapper}>
                    <Text style={text}>Немає акаунту?</Text>
                    <Text
                      style={[text, textUnderline]}
                      onPress={() => navigation.navigate("Registration")}
                    >
                      Зареєструватися
                    </Text>
                  </View>
                </View>
              )}
            </KeyboardAvoidingView>
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
  formContainer: {
    height: "60%",
    width: "100%",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
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

export default LoginScreen;
