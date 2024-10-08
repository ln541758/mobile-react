import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function GoalDetails({ navigation, route }) {
  // console.log(route.params.goalData);

  const [warning, setWarning] = useState(false);

  const handleWarning = () => {
    setWarning(true);
    navigation.setOptions({
      title: "Warning",
    });
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleWarning} title="Warning" color="red" />
      ),
    });
  });

  function moreDetailsHandler() {
    navigation.push("Details");
  }

  return (
    <View>
      {route.params ? (
        <Text style={warning && styles.warningStyle}>
          This is details of a goal with text {route.params.goalData.text} and
          id {route.params.goalData.id}
        </Text>
      ) : (
        <Text style={warning && styles.warningStyle}>More Details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },
});
