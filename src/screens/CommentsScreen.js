import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import VectorSvg from "../../assets/svg/VectorSvg";
// import { useKeyboardVisible } from "../hooks/Keyboard";

const CommentsScreen = () => {
  const {
    container,
    wrapper,
    imageWrapper,
    imageStyles,
    list,
    commentSection,
    commentWrapper,
    currentUserCommentWrapper,
    comment,
    lastComment,
    userComment,
    currentUserComment,
    userIconWrapper,
    text,
    date,
    input,
    arrowIconWrapper,
  } = styles;

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [newComment, setNewComment] = useState("");

  // fake data to create markup and styles
  const [currentUser, setCurrentUser] = useState({
    currentUserId: 2,
    currentUserImage: null,
  });
  const [comments, setComments] = useState([
    {
      userId: 1,
      userImage: null,
      comment:
        "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
      commentDate: "09 червня, 2020 | 08:40",
    },
    {
      userId: 2,
      userImage: null,
      comment:
        "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
      commentDate: "09 червня, 2020 | 09:14",
    },
    {
      userId: 3,
      userImage: null,
      comment: "Thank you! That was very helpful!",
      commentDate: "09 червня, 2020 | 09:20",
    },
  ]);

  const renderItem = ({ item }) => {
    // console.log("item", item);
    // console.log("currentUserId", currentUser.currentUserId);
    // console.log("comments.length", comments.length);

    return (
      <View
        style={[
          commentWrapper,
          item.userId === currentUser.currentUserId
            ? currentUserCommentWrapper
            : null,
          item.userId === comments.length ? lastComment : null,
        ]}
      >
        <View style={userIconWrapper}>
          <Image style={imageStyles}>{item.userImage}</Image>
        </View>

        <View
          style={[
            comment,
            item.userId === currentUser.currentUserId
              ? currentUserComment
              : userComment,
          ]}
        >
          <Text style={text}>{item.comment}</Text>
          <Text style={date}>{item.commentDate}</Text>
        </View>
      </View>
    );
  };
  // /////////////////////////////////////

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
          </View>

          <View style={commentSection}>
            <FlatList
              data={comments}
              renderItem={renderItem}
              keyExtractor={(item) => item.userId}
              style={list}
            />
          </View>

          <View style={{ width: "100%" }}>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={
                  isInputFocused
                    ? [
                        input,
                        {
                          borderColor: "#FF6C00",
                          backgroundColor: "#ffffff",
                        },
                      ]
                    : input
                }
                placeholder={"Коментувати..."}
                placeholderTextColor={"#BDBDBD"}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity style={arrowIconWrapper}>
                <VectorSvg style={{ fill: "#ffffff" }} />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
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
  list: {
    flex: 1,
  },
  commentSection: {
    flex: 1,
    width: "100%",
    marginTop: 32,
    marginBottom: 31,
  },
  commentWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,

    // ///////////////
    // borderWidth: 1,
    // borderColor: "blue",
  },
  lastComment: {
    marginBottom: 0,

    // ///////////////
    // backgroundColor: "orange",
  },
  currentUserCommentWrapper: {
    flexDirection: "row-reverse",
  },

  comment: {
    width: 299,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    // marginBottom: 24,
  },

  userComment: {
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,

    // ///////////////
    // backgroundColor: "grey",
  },
  currentUserComment: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,

    // ///////////////
    // backgroundColor: "gold",
  },

  userIconWrapper: {
    marginTop: 2,
    width: 28,
    height: 28,
    backgroundColor: "#E8E8E8",
    borderRadius: 50,
    overflow: "hidden",
  },
  text: {
    fontFamily: "Roboto_400Regular",
    fontSize: 13,
    color: "#212121",
  },
  date: {
    marginTop: 8,
    fontFamily: "Roboto_400Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
  input: {
    width: "100%",
    height: 50,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },
  arrowIconWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
});

export default CommentsScreen;
