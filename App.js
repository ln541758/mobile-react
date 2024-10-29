import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";

export default function App() {
  const Stack = createNativeStackNavigator();

  const AuthStack = (
    <>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
          title: "My goals",
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate("Profile");
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.6 : 1,
                },
              ]}
            >
              <AntDesign name="profile" size={24} color="white" />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Details"
        component={GoalDetails}
        options={({ route }) => ({
          title: route.params ? route.params.goalData.text : "More Details",
          headerRight: () => {
            return (
              <Button
                title="Warning"
                onPress={() => {
                  console.log("warning");
                }}
              />
            );
          },
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerRight: () => (
            <Pressable
              onPress={() => {
                signOut(auth)
                  .then(() => {
                    navigation.replace("Home");
                  })
                  .catch((error) => {
                    console.error("Logout failed: ", error);
                  });
              }}
              style={({ pressed }) => [
                {
                  marginRight: 10,
                  opacity: pressed ? 0.6 : 1,
                },
              ]}
            >
              <AntDesign name="logout" size={24} color="white" />
            </Pressable>
          ),
        })}
      />
    </>
  );

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "purple" },
          headerTintColor: "white",
        }}
      >
        {isUserLoggedIn ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
