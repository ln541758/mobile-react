import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";


export default function GoalDetails({navigation, route}) {
    const [warning, setWarning] = useState(false);
    const handleWarning = () => {
        setWarning(true);
        console.log("warning")
        navigation.setOptions({
            title: "Warning!",
        })
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                  <Button
                    title="Warning"
                    onPress={handleWarning}
                    color="white"
                  />
                );
              },
        })
    })

  // console.log(route.params.goalData);

  function moreDetailsHandler() {
    navigation.push("Details");
  }

  return (
    <View>
      {route.params ? (
        <Text style={warning ? styles.warning : null}>
          This is details of a goal with text {route.params.goalData.text} and
          id {route.params.goalData.id}
        </Text>
      ) : (
        <Text  style={warning ? styles.warning : null}>More Details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
    warning: {
        color: "red",
    },  
});
