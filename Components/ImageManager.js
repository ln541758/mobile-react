import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager() {
  async function takeImageHandler() {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
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
