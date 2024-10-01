import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import Header from "./Header";
import Input from "./Input";
import { useState } from "react";
import GoalItem from "./GoalItem";

export default function Home({ navigation }) {
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

  function handleDelete(deletedId) {
    // console.log("App.js knows goal is deleted");
    // const newGoals = goals.filter((goalObj) => {
    //   return goalObj.id !== deletedId;
    // });
    setGoals((prevGoals) => {
      return prevGoals.filter((goalObj) => {
        return goalObj.id !== deletedId;
      });
    });
  }

  function deleteAllGoals() {
    Alert.alert("Delete all", "Are you sure?", [
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
        },
      },
      {
        text: "No",
        onPress: () => {
          console.log("Delete cancelled");
        },
      },
    ]);
  }

  function renderSeparator() {
    return <View style={styles.seperators} />;
  }

  function handleGoalPress() {
    navigation.navigate("Details");
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
        <FlatList
          contentContainerStyle={styles.scrollViewContainer}
          // ListEmptyComponent={<Text style={styles.text}>No goals to show</Text>}
          ItemSeparatorComponent={renderSeparator}
          ListHeaderComponent={() =>
            goals.length > 0 ? (
              <Text style={styles.text}>My goals</Text>
            ) : (
              <Text style={styles.text}>No goals to show</Text>
            )
          }
          ListFooterComponent={() =>
            goals.length > 0 ? (
              <View>
                <Button title="Delete All" onPress={deleteAllGoals} />
              </View>
            ) : null
          }
          data={goals}
          renderItem={({ item }) => {
            return <GoalItem goalObj={item} deleteHandler={handleDelete} pressHandler={handleGoalPress}/>;
          }}
        />

        {/* <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.text}>{receivedData}</Text> 
          {goals.map((goalObj) => {
            return (
              <View style={styles.textContainer}>
                <Text style={styles.text} key={goalObj.id}>
                  {goalObj.text}
                </Text>
              </View>
            );
          })}
        </ScrollView>*/}
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
  scrollViewContainer: {
    // alignItems: "center",
  },
  text: {
    color: "purple",
    fontSize: 20,
    marginTop: 10,
    alignSelf: "center",
  },
  seperators: {
    height: 4,
    width: "100%",
    backgroundColor: "gray",
    alignSelf: "center",
  },
});