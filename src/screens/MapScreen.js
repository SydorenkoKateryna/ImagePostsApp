import React from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";

const MapScreen = () => {
  const { container } = styles;
  return (
    <SafeAreaView style={container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View>
        <Text>MapScreen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
