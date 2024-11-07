import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ imageUriHandler }) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageurl, setImageUrl] = useState("");
  // console.log(response);
  async function verifyPermissions() {
    try {
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
      if (!result.canceled) {
        console.log(result.assets[0].uri);
        setImageUrl(result.assets[0].uri);
        imageUriHandler(result.assets[0].uri);
      }
    } catch (err) {
      console.log("take an image", err);
    }
  }

  return (
    <View>
      <Button title="Take an image" onPress={takeImageHandler} />
      {imageurl && (
        <Image
          source={{
            uri: imageurl,
          }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({ image: { width: 100, height: 100 } });
