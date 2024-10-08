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
    <Pressable onPress={handlePress}>
      <View style={styles.textContainer}>
        <Text style={styles.text} key={goalObj.id}>
          {goalObj.text}
        </Text>
        <Button title="X" color="gray" onPress={handleDelete} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "darkgray",
    padding: 5,
    margin: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "purple",
    fontSize: 20,
  },
});
