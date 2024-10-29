import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native";
import { useState } from "react";
import { auth } from "../Firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleLogin() {
    navigation.replace("Login");
  }

  const handleSignup = async () => {
    // email, password are not empty
    if (email === "" || password === "") {
      alert("Email and password are required");
      return;
    }
    // if password and confirm are the same then create user
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("User created");
      } catch (error) {
        alert("Error creating user");
      }
    }
  };

  return (
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
      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry={true}
      />
      <Button title="Register" onPress={handleSignup} />
      <Button title="Already Registered? Login" onPress={handleLogin} />
    </View>
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
