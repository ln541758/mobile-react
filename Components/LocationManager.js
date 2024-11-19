import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { getFromDB, writeWithIdToDB } from "../Firebase/firestoreHelper";
import { auth } from "../Firebase/firebaseSetup";

export default function LocationManager() {
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (route.params) {
      console.log(
        "route.params.selectedLocation",
        route.params.selectedLocation
      );
      setLocation(route.params.selectedLocation);
    }
  }, [route]);

  useEffect(() => {
    async function getUserData() {
      const userData = await getFromDB("users", auth.currentUser.uid);
      if (userData && userData.location) {
        console.log("userData from Firebase", userData.location);
        setLocation(userData.location);
      }
    }
    getUserData();
  }, []);

  async function verifyPermissions() {
    try {
      console.log(response);
      // const { status } = ImagePicker.getCameraPermissionsAsync();
      // check if user has granted permissions
      if (response.granted) {
        return true;
      }
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {
      console.log("verify permission", err);
    }
  }

  async function locateUserHandler() {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert("You need to give location permission");
        return;
      }
      const response = await Location.getCurrentPositionAsync();
      // console.log(response);
      setLocation({
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      });
      console.log(location);
    } catch (err) {
      console.log("location user", err);
    }
  }
  //   if (location)
  //     console.log(
  //       `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`
  //     );

  function saveUseLocation() {
    // console.log("saveUseLocation", location);
    writeWithIdToDB({ location }, "users", auth.currentUser.uid);
    navigation.navigate("Home");
  }

  return (
    <View>
      <Button title="Get My Location" onPress={locateUserHandler} />
      <Button
        title="Let me choose on map"
        onPress={() => {
          navigation.navigate("Map");
        }}
      />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`,
          }}
          style={{ width: windowWidth, height: 200 }}
        />
      )}
      <Button title="Save Location" onPress={saveUseLocation} />
    </View>
  );
}

const styles = StyleSheet.create({});
