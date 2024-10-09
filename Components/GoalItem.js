import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";


export default function GoalItem({ goalObj, deleteHandler, pressHandler }) {
  const navigation = useNavigation();
  function handleDelete() {
    // console.log("deleted");
    deleteHandler(goalObj.id);
  }

  function handlePress() {
    // pressHandler(goalObj);
    navigation.navigate("Details", { goalData: goalObj });
  }

  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => {
          return [pressed && styles.pressedStyle, styles.horizontalContainer];
        }}
        android_ripple={{ color: "red", radius: 100 }}
      >
        <Text style={styles.text} key={goalObj.id}>
          {goalObj.text}
        </Text>
        {/* <Button title="X" color="gray" onPress={handleDelete} /> */}
        <PressableButton
          componentStyle={styles.deleteButton}
          onPress={handleDelete}
          pressedStyle={styles.pressedStyle}
        >
          {/* <Text style={styles.deleteText}>X</Text> */}
          <AntDesign name="delete" size={24} color="black" />
        </PressableButton>
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
  deleteButton: {
    backgroundColor: "gray",
  },
  deleteText: {
    color: "white",
  },
  pressedStyle: {
    opacity: 0.5,
    backgroundColor: "pink",
  },
});
