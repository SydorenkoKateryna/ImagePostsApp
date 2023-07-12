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
import { useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import Button from "../components/Button";
import InputButton from "../components/InputButton";
import { useKeyboardVisible } from "../hooks/Keyboard";
import * as DocumentPicker from "expo-document-picker";
import ProfileImgSvg from "../../assets/svg/ProfileImgSvg";

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
    addProfileImgBtn,
    deleteProfileImgBtn,
  } = styles;

  const navigation = useNavigation();

  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [isFocused, setIsFocused] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleClearState = () => {
    setLogin("");
    setEmail("");
    setPassword("");
    setImage(null);
  };

  const signIn = () => {
    if (!login || !email || !password) {
      return console.warn("Будь ласка заповніть всі поля!");
    }

    console.log({ login, email, password, image });

    navigation.navigate("Home", { user: { login, email, password } });

    handleClearState();
  };

  const handleAddImage = async () => {
    const uploadedImage = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (uploadedImage.type === "cancel") {
      return setImage(null);
    }

    setImage(uploadedImage);
  };

  const handleDeleteImage = () => {
    setImage(null);
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
              {image && <Image style={imageStyles} source={image} />}
              {image ? (
                <TouchableOpacity
                  style={[imageButton, { transform: [{ rotate: "45deg" }] }]}
                  onPress={handleDeleteImage}
                >
                  <ProfileImgSvg style={deleteProfileImgBtn} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={imageButton} onPress={handleAddImage}>
                  <ProfileImgSvg style={addProfileImgBtn} />
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
                    isFocusedInput={isFocused.login}
                    placeholder={"Логін"}
                    autoComplete={"username"}
                    onFocus={() => handleFocus("login")}
                    onBlur={() => handleBlur("login")}
                    value={login}
                    onChangeText={setLogin}
                  />
                </View>

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
                      text={"Зареєстуватися"}
                      onPress={signIn}
                      disabled={!login || !email || !password}
                    />

                    <View style={textWrapper}>
                      <Text style={text}>Вже є акаунт?</Text>
                      <Text
                        style={[text, textUnderline]}
                        onPress={() => navigation.navigate("Login")}
                      >
                        Увійти
                      </Text>
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
  addProfileImgBtn: {
    fill: "#FF6C00",
    stroke: "#FF6C00",
    backgroundColor: "#ffffff",
  },
  deleteProfileImgBtn: {
    fill: "#BDBDBD",
    stroke: "#BDBDBD",
    backgroundColor: "#ffffff",
  },
});

export default RegistrationScreen;
