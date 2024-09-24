import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GoalItem({ goalObj }) {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text} key={goalObj.id}>
        {goalObj.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: "darkgray",
        padding: 20,
        margin: 10,
        borderRadius: 5,
      },
      text: {
        color: "purple",
        fontSize: 20,
      },
});
