import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermissions } from "expo-image-picker";

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();

  async function takeImageHandler() {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      console.log(result.assets[0].uri);
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
