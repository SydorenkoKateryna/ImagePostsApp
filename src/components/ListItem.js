import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MessageSvg from "../../assets/svg/MessageSvg";
import ThumbsUpSvg from "../../assets/svg/ThumbsUpSvg";
import MapPinSvg from "../../assets/svg/MapPinSvg";

const ListItem = ({
  image,
  title,
  comments,
  likes,
  region,
  country,
  latitude,
  longitude,
}) => {
  const {
    item,
    imageWrapper,
    postImage,
    secondtitle,
    detailsWrapper,
    commentsWrapper,
    commentsText,
    likesWrapper,
    likesText,
    mapPinWrapper,
    mapPinText,
  } = styles;

  const navigation = useNavigation();

  return (
    <View style={item}>
      <View style={imageWrapper}>
        <Image source={image} style={postImage} />
      </View>
      <Text style={secondtitle}>{title}</Text>

      <View style={detailsWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={commentsWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
              <MessageSvg
                style={
                  comments > 0
                    ? { stroke: "#FF6C00", fill: "#FF6C00" }
                    : { stroke: "#BDBDBD", fill: "#ffffff" }
                }
              />
            </TouchableOpacity>

            <Text style={commentsText}>{comments}</Text>
          </View>

          {likes || likes === 0 ? (
            <View style={likesWrapper}>
              <TouchableOpacity>
                <ThumbsUpSvg
                  style={likes > 0 ? { fill: "#FF6C00" } : { fill: "#BDBDBD" }}
                />
              </TouchableOpacity>

              <Text style={likesText}>{likes}</Text>
            </View>
          ) : null}
        </View>

        <View style={mapPinWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Map", { latitude, longitude })}
            style={{ marginRight: 4 }}
          >
            <MapPinSvg style={{ stroke: "#BDBDBD" }} />
          </TouchableOpacity>

          {region ? <Text style={mapPinText}>{region}, </Text> : null}
          <Text style={mapPinText}>{country}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 32,
  },
  imageWrapper: {
    height: 240,
    width: "100%",
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#BDBDBD",
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  secondtitle: {
    marginBottom: 8,
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    color: "#212121",
  },
  detailsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsText: {
    marginLeft: 4,
  },
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
  },
  likesText: {
    marginLeft: 4,
  },
  mapPinWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  mapPinText: {
    textDecorationLine: "underline",
  },
});

export default ListItem;
