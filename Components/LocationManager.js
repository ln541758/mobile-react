import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";

export default function LocationManager() {
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState("");


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
      const response= await Location.getCurrentPositionAsync();
      // console.log(response);
      setLocation({latitute: response.coords.latitude, longitude: response.coords.longitude});
    } catch (err) {
      console.log("location user", err);
    }
  }

  return (
    <View>
      <Button title="Get My Location" onPress={locateUserHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});
