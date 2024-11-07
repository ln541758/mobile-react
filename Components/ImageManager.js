import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  // console.log(response);
  async function verifyPermissions() {
    try {
      const { status } = ImagePicker.getCameraPermissionsAsync();
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

  async function takeImageHandler() {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert("You need to give camera permission");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      // console.log(result.assets[0].uri);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View>
      <Button title="Open Camera" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});
