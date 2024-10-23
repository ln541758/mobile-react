import { StyleSheet, View, Text, useWindowDimensions, Dimensions } from "react-native";
import React from "react";


export default function Header({ name, children }) {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          { color: height < 800 ? "red" : "darkmagenta" },
          { paddingHorizontal: width < 200 ? 0 : 10 },
          { paddingVertical: height < 300 ? 0 : 10 },
          { fontSize: width < 600 ? 25 : 40 },
        ]}
      >
        Welcome to {name}!
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "darkmagenta",
    fontSize: 25,
  },
  container: {
    borderColor: "darkmagenta",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});
