import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
import { useKeyboardVisible } from "../hooks/Keyboard";
import CameraSvg from "../../assets/svg/CameraSvg";
import MapPinSvg from "../../assets/svg/MapPinSvg";
import TrashSvg from "../../assets/svg/TrashSvg";

const CreatePostsScreen = () => {
  const {
    container,
    wrapper,
    imageWrapper,
    imageStyles,
    cameraIconWrapper,
    locationIconWrapper,
    trashIconWrapper,
    text,
    formContainer,
    input,
    lastInput,
  } = styles;

  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState({
    title: false,
    password: false,
  });
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleClearState = () => {
    setTitle("");
    setLocation("");
    setPhoto(null);
  };

  const handleSubmit = () => {
    if (!photo || !title || !location) {
      return console.warn("Будь ласка заповніть всі поля!");
    }

    console.log({ photo, title, location });

    navigation.navigate("Posts", { post: { photo, title, location } });

    handleClearState();
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
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={wrapper}>
          <View style={imageWrapper}>
            <Image style={imageStyles} />

            <TouchableOpacity
              style={[
                cameraIconWrapper,
                photo
                  ? { backgroundColor: "rgba(255, 255, 255, 0.3)" }
                  : { backgroundColor: "#ffffff" },
              ]}
            >
              <CameraSvg
                style={photo ? { fill: "#ffffff" } : { fill: "#BDBDBD" }}
              />
            </TouchableOpacity>
          </View>

          <Text style={text}>
            {photo ? "Редагувати фото" : "Завантажте фото"}
          </Text>

          <View style={formContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  style={
                    isFocused.title
                      ? [
                          input,
                          {
                            borderColor: "#FF6C00",
                            backgroundColor: "#ffffff",
                          },
                        ]
                      : input
                  }
                  placeholder={"Назва..."}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => handleFocus("title")}
                  onBlur={() => handleBlur("title")}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View>
                <TextInput
                  style={
                    isFocused.location
                      ? [
                          input,
                          lastInput,
                          {
                            borderColor: "#FF6C00",
                            backgroundColor: "#ffffff",
                          },
                        ]
                      : [input, lastInput]
                  }
                  placeholder={"Місцевість..."}
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => handleFocus("location")}
                  onBlur={() => handleBlur("location")}
                  value={location}
                  onChangeText={setLocation}
                />
                <TouchableOpacity style={locationIconWrapper}>
                  <MapPinSvg style={{ stroke: "#BDBDBD" }} />
                </TouchableOpacity>
              </View>

              {!useKeyboardVisible() && (
                <View style={{ marginTop: 32 }}>
                  <Button
                    text={"Опублікувати"}
                    onPress={handleSubmit}
                    disabled={!photo || !title || !location}
                  />
                </View>
              )}
            </KeyboardAvoidingView>
          </View>

          {!useKeyboardVisible() && (
            <TouchableOpacity
              style={trashIconWrapper}
              onPress={handleClearState}
            >
              <TrashSvg style={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
  },
  imageWrapper: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
  },
  imageStyles: {
    width: "100%",
    height: "100%",
  },
  cameraIconWrapper: {
    position: "absolute",
    top: 92,
    left: 142,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  locationIconWrapper: {
    position: "absolute",
    top: 13,
    left: 0,
  },
  trashIconWrapper: {
    position: "absolute",
    bottom: 10,
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  text: {
    alignSelf: "flex-start",
    marginTop: 8,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  formContainer: {
    width: "100%",
    marginTop: 32,
  },
  input: {
    height: 50,
    marginBottom: 16,
    paddingTop: 16,
    paddingLeft: 0,
    paddingRight: 16,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto_500Medium",

    fontSize: 16,
    color: "#212121",
    backgroundColor: "#ffffff",
  },
  lastInput: {
    marginBottom: 0,
    paddingLeft: 28,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
});

export default CreatePostsScreen;
