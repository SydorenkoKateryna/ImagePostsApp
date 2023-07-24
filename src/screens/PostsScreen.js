import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import ListItem from "../components/ListItem";
import { FAKEDATA } from "../fakeData";

const PostsScreen = () => {
  const renderItem = ({ item }) => (
    <ListItem
      image={item.image}
      title={item.title}
      comments={item.comments}
      region={item.location.region}
      country={item.location.country}
      latitude={item.geolocation?.latitude ?? null}
      longitude={item.geolocation?.longitude ?? null}
    />
  );

  const {
    container,
    wrapper,
    userInfWrapper,
    userImageWrapper,
    userImage,
    userTextWrapper,
    userTextFirst,
    userTextSecond,
    list,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={wrapper}>
        <View style={userInfWrapper}>
          <View style={userImageWrapper}>
            <Image style={userImage} />
          </View>

          <View style={userTextWrapper}>
            <Text style={userTextFirst}>Natali Romanova</Text>
            <Text style={userTextSecond}>email@example.com</Text>
          </View>
        </View>

        <FlatList
          data={FAKEDATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    backgroundColor: "#ffffff",
  },
  userInfWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImageWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#BDBDBD",
    borderRadius: 16,
    overflow: "hidden",
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  userTextWrapper: {
    marginLeft: 8,
  },
  userTextFirst: {
    fontFamily: "Roboto_700Bold",
    fontSize: 13,
    color: "#212121",
  },
  userTextSecond: {
    fontFamily: "Roboto_400Regular",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  list: {
    marginTop: 32,
    flex: 1,
  },
});

export default PostsScreen;
