import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import Entypo from "@expo/vector-icons/Entypo";
import { markGoalAsWarning } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";

export default function GoalDetails({ navigation, route }) {
  // console.log(route.params.goalData);

  const [warning, setWarning] = useState(false);
  const [imageUri, setImageUri] = useState("");

  function handleWarning() {
    if (route.params && route.params.goalData && route.params.goalData.id) {
      setWarning(true);
      navigation.setOptions({
        title: "Warning",
      });
      markGoalAsWarning(route.params.goalData.id);
    }
  }

  useEffect(() => {
    async function fetchImageUrl() {
      if (route.params && route.params.goalData && route.params.goalData.imageUri) {
        try {
          const reference = ref(storage, route.params.goalData.imageUri);
          const uri = await getDownloadURL(reference);
          console.log("Image URL:", uri);
          setImageUri(uri);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
    }
    fetchImageUrl();
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableButton
          onPress={handleWarning}
          componentStyle={styles.warningStyle}
          pressedStyle={styles.warningButtonPressed}
        >
          <Entypo name="warning" size={24} color="red" />
        </PressableButton>
      ),
    });
  }, [navigation, handleWarning]);

  function moreDetailsHandler() {
    navigation.push("Details");
  }

  return (
    <View>
      {route.params ? (
        <>
          <Text style={warning && styles.warningStyle}>
            This is details of a goal with text {route.params.goalData.text} and
            id {route.params.goalData.id}
          </Text>
          <Button title="More Details" onPress={moreDetailsHandler} />
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
          <GoalUsers goalId={route.params?.goalData?.id} />
        </>
      ) : (
        <Text style={warning && styles.warningStyle}>More Details</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  warningStyle: {
    color: "red",
  },

  warningButtonPressed: {
    backgroundColor: "yellow",
  },

  image: {
    width: 100,
    height: 100,
  },
});
