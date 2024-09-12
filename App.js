import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header";
import { useState } from "react";
import { TextInput } from 'react-native';


export default function App() {
  const appName = "My awesome app";
  const [text, setText] = useState("Hello");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}>
        <Text>child 1</Text>
        <Text>child 2</Text>
      </Header>
      <TextInput
        placeholder="Type something"
        keyboardType="default"
        style={{ borderBottonColor: "purple", borderBottomWidth: 2 }}
        value={text}
        onChangeText={function (changedText) {
          setText(changedText);
        }}
      />
      <Text>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
