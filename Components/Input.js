import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";


export default function Input({ autoFocus }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <View>
      <TextInput
        ref={inputRef}
        placeholder="Type something"
        keyboardType="default"
        style={{ borderBottonColor: "purple", borderBottomWidth: 2 }}
        value={text}
        onChangeText={function (changedText) {
          setText(changedText);
        }}
      />
      {text.length > 0 && (
        <Text style={{ color: 'gray', marginTop: 5 }}>
          Character count: {text.length}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
