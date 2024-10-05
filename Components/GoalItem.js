import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function GoalItem({ goalObj, deleteHandler}) {
  function handleDelete() {
    // console.log("deleted");
    deleteHandler(goalObj.id);
  }

  const navigation = useNavigation();

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text} key={goalObj.id}>
        {goalObj.text}
      </Text>
      <Button title="X" color="gray" onPress={handleDelete} />
      <Button title="i" onPress={()=>{navigation.navigate("Details", { goalData: goalObj })}} />
    </View>
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
