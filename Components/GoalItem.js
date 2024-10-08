import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import React from "react";

export default function GoalItem({ goalObj, deleteHandler, pressHandler }) {
  function handleDelete() {
    // console.log("deleted");
    deleteHandler(goalObj.id);
  }

  function handlePress() {
    pressHandler(goalObj);
  }

  return (
    <View
      style={({ pressed }) => {
        return [pressed && styles.pressedStyle, styles.horizontalContainer];
      }}
    >
      <Pressable
        onPress={handlePress}
        style={() => {
          return styles.horizontalContainer;
        }}
        anroid_ripple={{ color: "red", radius: 100 }}
      >
        <Text style={styles.text} key={goalObj.id}>
          {goalObj.text}
        </Text>
        <Button title="X" color="gray" onPress={handleDelete} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "darkgray",
    padding: 5,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "purple",
    fontSize: 20,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "darkgray",
  },
  pressedStyle: {
    opacity: 0.5,
    backgroundColor: "darkgray",
  },
});
