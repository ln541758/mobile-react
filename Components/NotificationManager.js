import { View, Text, Button, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";
export async function verifyPermissions() {
  try {
    const permissionResponse = await Notifications.getPermissionsAsync();
    console.log(permissionResponse);
    if (permissionResponse.status === "granted") {
      return true;
    }
    const requestPermission = await Notifications.requestPermissionsAsync();
    return requestPermission.status === "granted";
  } catch (err) {
    console.log("verify permission", err);
    return false;
  }
}

export default function NotificationManager() {
  async function scheduleNotificationHandler() {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert("You need to give notification permission");
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "First Notification",
          body: "This is my first notification",
        },
        trigger: {
          seconds: 3,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View>
      <Button
        title="Schedule a Notification"
        onPress={scheduleNotificationHandler}
      />
    </View>
  );
}
