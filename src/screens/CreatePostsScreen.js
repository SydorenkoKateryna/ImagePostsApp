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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import CreatePostsComponent from "../components/CreatePostsComponent";
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
    locationIconWrapper,
    trashIconWrapper,
    text,
    formContainer,
    input,
    lastInput,
    imageIconWrapper,
  } = styles;

  const navigation = useNavigation();
  const isFocusedCamera = useIsFocused();
  const [isFocused, setIsFocused] = useState({
    title: false,
    password: false,
  });
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState(null);
  const [geolocation, setGeolocation] = useState(null);

  const handleClearState = () => {
    setTitle("");
    setLocation(null);
    setPhoto(null);
    setGeolocation(null);
  };

  const handleSubmit = async () => {
    // if (!photo || !title || !location) {
    //   return console.warn("Будь ласка заповніть всі поля!");
    // }
    console.log({
      photo,
      title,
      location,
      geolocation,
    });

    navigation.navigate("Posts", {
      photo,
      title,
      location,
      geolocation,
    });

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
            {photo ? (
              <View>
                <Image style={imageStyles} source={{ uri: photo }} />
                <TouchableOpacity
                  onPress={() => setPhoto(null)}
                  style={imageIconWrapper}
                >
                  <CameraSvg style={{ fill: "#ffffff" }} />
                </TouchableOpacity>
              </View>
            ) : (
              isFocusedCamera && (
                <CreatePostsComponent
                  setPhoto={setPhoto}
                  setGeolocation={setGeolocation}
                  setLocation={setLocation}
                />
              )
            )}
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
  imageIconWrapper: {
    position: "absolute",
    top: 92,
    left: 152,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

export default CreatePostsScreen;
