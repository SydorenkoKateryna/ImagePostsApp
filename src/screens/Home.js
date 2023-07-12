import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import LogOutSvg from "../../assets/svg/LogOutSvg";
import ArrowLeftSvg from "../../assets/svg/ArrowLeftSvg";
import GridSvg from "../../assets/svg/GridSvg";
import UnionSvg from "../../assets/svg/UnionSvg";
import UserSvg from "../../assets/svg/UserSvg";

const Tabs = createBottomTabNavigator();

const Home = () => {
  const { logOutBtn, backBtn, tabBtn, svgWrapper } = styles;

  const BackBtn = () => (
    <TouchableOpacity
      style={backBtn}
      onPress={() => navigation.navigate("Posts")}
      // onPress={() => navigation.goBack()}
    >
      <ArrowLeftSvg style={{ stroke: "#212121" }} />
    </TouchableOpacity>
  );

  const LogOutBtn = () => (
    <TouchableOpacity
      style={logOutBtn}
      onPress={() => navigation.navigate("Login")}
    >
      <LogOutSvg style={{ stroke: "#BDBDBD" }} />
    </TouchableOpacity>
  );

  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleStyle: {
          fontFamily: "Roboto_500Medium",
          fontWeight: "medium",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.41,
        },
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#212121",
        tabBarStyle: {
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          minHeight: 60,
        },
        tabBarButton: (props) => {
          if (route.name === "Posts") {
            return <TouchableOpacity {...props} style={tabBtn} />;
          } else if (route.name === "CreatePosts") {
            return <TouchableOpacity {...props} style={tabBtn} />;
          } else if (route.name === "Profile") {
            return (
              <TouchableOpacity
                {...props}
                style={{
                  ...tabBtn,
                  marginRight: 0,
                }}
              />
            );
          }
        },
        tabBarIcon: ({ focused }) => {
          if (route.name === "Posts") {
            return (
              <View
                style={[
                  svgWrapper,
                  focused
                    ? { backgroundColor: "#FF6C00" }
                    : { backgroundColor: "#ffffff" },
                ]}
              >
                <GridSvg
                  style={
                    focused ? { stroke: "#ffffff" } : { stroke: "#212121" }
                  }
                />
              </View>
            );
          } else if (route.name === "CreatePosts") {
            return (
              <View
                style={[
                  svgWrapper,
                  focused
                    ? { backgroundColor: "#FF6C00" }
                    : { backgroundColor: "#ffffff" },
                ]}
              >
                <UnionSvg
                  style={focused ? { fill: "#ffffff" } : { fill: "#212121" }}
                />
              </View>
            );
            // <UnionSvg style={{ fill: "#ffffff" }} />;
          } else if (route.name === "Profile") {
            return (
              <View
                style={[
                  svgWrapper,
                  focused
                    ? { backgroundColor: "#FF6C00" }
                    : { backgroundColor: "#ffffff" },
                ]}
              >
                <UserSvg
                  style={
                    focused ? { stroke: "#ffffff" } : { stroke: "#212121" }
                  }
                />
              </View>
            );
            // <UserSvg style={{ stroke: "#212121" }} />;
          }
        },
      })}
      initialRouteName="Posts"
    >
      <Tabs.Screen
        name={"Posts"}
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: LogOutBtn,
        }}
      />
      <Tabs.Screen
        name={"CreatePosts"}
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerLeft: BackBtn,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{
          title: "Профіль",
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerLeft: BackBtn,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerLeft: BackBtn,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  logOutBtn: {
    position: "absolute",
    bottom: 10,
    right: 16,
  },
  backBtn: {
    position: "absolute",
    bottom: 10,
    left: 16,
  },
  tabBtn: {
    alignSelf: "center",
    marginRight: 16,
    width: 70,
    height: 40,
    borderRadius: 20,
  },
  svgWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});

export default Home;
