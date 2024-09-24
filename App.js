import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import Header from "./Components/Header";
import Input from "./Components/Input";
import { useState } from "react";

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const appName = "My awesome app";
  function handleInputData(data) {
    console.log("App.js ", data);

    let newGoal = { text: data, id: Math.random() };
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });

    setReceivedData(data);
    setModalVisible(false);
  }

  function isModalVisible() {
    setModalVisible(true);
  }

  function handleCancelInput() {
    setModalVisible(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <StatusBar style="auto" />
        <Header name={appName}>
          {/* <Text>child 1</Text>
        <Text>child 2</Text> */}
        </Header>
        <Button title="Add a Goal" onPress={isModalVisible} />
        <Input
          autoFocus={true}
          inputHandler={handleInputData}
          modalVisible={modalVisible}
          cancelHandler={handleCancelInput}
        />
      </View>
      <View style={styles.bottomView}>
        {/* <Text style={styles.text}>{receivedData}</Text> */}
        {goals.map((goalObj) => {
          return (
            <View style={styles.textContainer}>
              <Text style={styles.text} key={goalObj.id}>
                {goalObj.text}
              </Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "darkgray",
    padding: 10,
    margin: 5,
    fontSize: 20,
    borderRadius: 5,
  },
  text: {
    color: "purple",
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 4,
    backgroundColor: "#d8bfd8",
    alignItems: "center",
  },
});
