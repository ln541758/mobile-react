import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { TextInput } from "react-native";

export default function Input() {
  const [text, setText] = useState("Hello");

  return (
    <View>
      <TextInput
        placeholder="Type something"
        keyboardType="default"
        style={{ borderBottonColor: "purple", borderBottomWidth: 2 }}
        value={text}
        onChangeText={function (changedText) {
          setText(changedText);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
