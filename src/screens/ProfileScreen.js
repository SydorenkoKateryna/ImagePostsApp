import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import ProfileImgSvg from "../../assets/svg/ProfileImgSvg";
import LogOutSvg from "../../assets/svg/LogOutSvg";
import ListItem from "../components/ListItem";
import { FAKEDATA } from "../fakeData";

const ProfileScreen = () => {
  const renderItem = ({ item }) => (
    <ListItem
      image={item.image}
      title={item.title}
      comments={item.comments}
      likes={item.likes}
      country={item.location.country}
    />
  );

  const {
    container,
    wrapper,
    imageBackground,
    imageWrapper,
    imageStyles,
    imageButton,
    title,
    addProfileImgBtn,
    deleteProfileImgBtn,
    logOutBtn,
    list,
  } = styles;

  const navigation = useNavigation();

  const [image, setImage] = useState(null);

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

  return (
    <SafeAreaView style={container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ImageBackground
        source={require("../../assets/auth-background.png")}
        resizeMode="cover"
        style={imageBackground}
      >
        <View style={wrapper}>
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

          <TouchableOpacity
            style={logOutBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <LogOutSvg style={{ stroke: "#BDBDBD" }} />
          </TouchableOpacity>

          <Text style={title}>Natali Romanova</Text>

          <FlatList
            data={FAKEDATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={list}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
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
  wrapper: {
    height: "85%",
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
  title: {
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    textAlign: "center",
    color: "#212121",
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
  logOutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  list: {
    marginTop: 32,
    flex: 1,
    width: "100%",
  },
});

export default ProfileScreen;
