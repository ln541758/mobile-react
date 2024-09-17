import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header";
import Input from "./Components/Input";
import { useState} from "react";

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const appName = "My awesome app";
  function handleInputData(data) {
    console.log("App.js ", data);
    setReceivedData(data);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}>
        <Text>child 1</Text>
        <Text>child 2</Text>
      </Header>
      <Input autoFocus={true} inputHandler={handleInputData}/>
      <Text>{receivedData}</Text>
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
