import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
// console.log(Stack);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={styles.header}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params ? route.params.goalData.text : "More Details",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    headerStyle: { backgroundColor: "purple" },
    headerTintColor: "white",
    title: "My goals",
  },
});
