import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import CameraSvg from "../../assets/svg/CameraSvg";
import { Feather } from "@expo/vector-icons";

const CreatePostsComponent = ({ setPhoto, setGeolocation, setLocation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraRatio, setCameraRatio] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const getGeolocation = async () => {
    const geolocation = await Location.getCurrentPositionAsync({});

    const coords = {
      latitude: geolocation.coords.latitude,
      longitude: geolocation.coords.longitude,
    };
    setGeolocation(coords);

    if (coords) {
      const locationDetails = await Location.reverseGeocodeAsync({
        ...coords,
      });

      [...locationDetails].map((item) => {
        const locationString = item.region + "," + " " + item.country;

        setLocation(locationString);
      });
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      getGeolocation();
    })();
  }, []);

  const onCameraReady = async () => {
    setIsCameraReady(true);

    const ratios = await cameraRef.getSupportedRatiosAsync();
    setCameraRatio(ratios[0]);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };

      try {
        const data = await cameraRef.takePictureAsync(options);
        const source = data.uri;

        await MediaLibrary.createAssetAsync(source);
        setPhoto(source);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const switchCamera = () => {
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity
        disabled={!isCameraReady}
        onPress={switchCamera}
        style={{ position: "absolute", top: 210, right: 12 }}
      >
        <Feather name="refresh-cw" size={20} color={"#ffffff"} />
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!isCameraReady}
        onPress={takePicture}
        style={styles.cameraIconWrapper}
      >
        <CameraSvg style={{ fill: "#BDBDBD" }} />
      </TouchableOpacity>
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={setCameraRef}
        style={styles.camera}
        type={cameraType}
        zoom={0}
        ratio={cameraRatio}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("camera error", error);
        }}
      >
        <View style={[styles.container]}>{renderCaptureControl()}</View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  control: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: "#ffffff",
  },
  cameraIconWrapper: {
    position: "absolute",
    top: 92,
    left: 152,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});

export default CreatePostsComponent;
