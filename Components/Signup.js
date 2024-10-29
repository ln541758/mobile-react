import { StyleSheet, Text, View, Keyboard, Alert } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TouchableWithoutFeedback } from "react-native";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleLogin() {
    navigation.replace("Login");
  }

  const handleSignup = async () => {
    try {
      // email, password, confirm are not empty
      if (email === "" || password === "" || confirm === "") {
        throw new Error("Email and password are required");
      }

      // if password and confirm are the same then create user
      if (password !== confirm) {
        throw new Error("Passwords do not match");
      }

      // other check: regex email, password length, etc.

      // Create user with Firebase
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      alert("User created successfully!");
      // navigation.replace("Login");
      navigation.navigation("Home");
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry={true}
        />
        <Button title="Register" onPress={handleSignup} />
        <Button title="Already Registered? Login" onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});
