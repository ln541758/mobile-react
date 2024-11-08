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
  Pressable,
  unstable_batchedUpdates,
} from "react-native";
import Header from "./Header";
import Input from "./Input";
import { useState, useEffect } from "react";
import GoalItem from "./GoalItem";
import PressableButton from "./PressableButton";
// import { app } from "../Firebase/firebaseSetup";
import { auth, database, storage } from "../Firebase/firebaseSetup";
import {
  writeToDB,
  deleteFromDB,
  deleteAllFromDB,
} from "../Firebase/firestoreHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";

export default function Home({ navigation, route }) {
  // console.log(database);

  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const appName = "My awesome app";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(database, "goals"),
        where("owner", "==", auth.currentUser.uid)
      ),
      (querySnapShot) => {
        let newArray = [];
        if (!querySnapShot.empty) {
          querySnapShot.forEach((docSnapshot) => {
            // Retrieve and store Document's ID
            newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
          });
        }
        // console.log("newArray ", newArray);
        setGoals(newArray);
      }
    );
    (error) => {
      console.log("onSnap", error);
      Alert.alert(error.message);
    };
    // detach the listerner
    return () => {
      unsubscribe();
    };
  }, []);

  function handleInputData(data) {
    console.log("App.js ", data);

    if (data.imageuri) {
      handleImageData(data.imageuri);
    }

    let newGoal = { text: data.text };
    newGoal = { ...newGoal, owner: auth.currentUser.uid };
    // setGoals((prevGoals) => {
    //   return [...prevGoals, newGoal];
    // });

    writeToDB("goals", newGoal);

    setReceivedData(data);
    setModalVisible(false);
  }

  async function handleImageData(uri) {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`fetch error happened with status: ${response.status}`);
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      // console.log("upload result", uploadResult);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log("handle image data", err);
    }
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

    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goalObj) => {
    //     return goalObj.id !== deletedId;
    //   });
    // });
    deleteFromDB(deletedId, "goals");
  }

  function deleteAllGoals() {
    Alert.alert("Delete all", "Are you sure?", [
      {
        text: "Yes",
        onPress: () => {
          // setGoals([]);
          deleteAllFromDB("goals");
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

  function renderSeparator({ highlighted }) {
    return (
      <View
        style={[
          styles.seperators,
          highlighted ? styles.seperatorHighlighted : null,
        ]}
      />
    );
  }

  // function handleGoalPress(pressGoal) {
  //   // console.log(pressGoal);
  //   navigation.navigate("Details", { goalData: pressGoal });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <StatusBar style="auto" />
        <Header name={appName}>
          {/* <Text>child 1</Text>
        <Text>child 2</Text> */}
        </Header>
        <PressableButton
          onPress={isModalVisible}
          componentStyle={styles.buttonDefault}
          pressedStyle={styles.buttonPressed}
        >
          <Text style={styles.buttonText}>Add a goal</Text>
        </PressableButton>

        {/* <Button title="Add a Goal" onPress={isModalVisible} /> */}
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
          renderItem={({ item, separators }) => {
            return (
              <GoalItem
                deleteHandler={handleDelete}
                goalObj={item}
                onPressIn={() => separators.highlight()}
                onPressOut={() => separators.unhighlight()}
              />
            );
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
  seperatorHighlighted: {
    backgroundColor: "purple",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 5,
  },
  buttonDefault: {
    backgroundColor: "purple",
    margin: 10,
    padding: 5,
  },
  buttonPressed: {
    backgroundColor: "pink",
  },
});
