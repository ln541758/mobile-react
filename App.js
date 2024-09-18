import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./Components/Header";
import Input from "./Components/Input";

export default function App() {
  const appName = "My awesome app";

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}>
        <Text>child 1</Text>
        <Text>child 2</Text>
      </Header>
      <Input autoFocus={true}/>
      {/* <Text>{text}</Text> */}
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
