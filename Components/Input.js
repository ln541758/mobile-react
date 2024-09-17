import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";

export default function Input({ autoFocus }) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [showCount, setShowCount] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  function handleConfirm(userText) {
    console.log(text);
  }



  const handleBlur = () => {
    if (text.length >= 3) {
      setMessage("Thank you");
    } else {
      setMessage("Please type more than 3 characters");
    }
    setShowCount(false);
  };

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
          setShowCount(changedText.length > 0);
          setMessage("");
        }}
        onBlur={handleBlur}
      />
      {showCount && (
        <Text style={{ color: "gray", marginTop: 5 }}>
          Character count: {text.length}
        </Text>
      )}
      {message && (
        <Text style={{ color: "gray", marginTop: 5 }}>{message}</Text>
      )}

      <Button
        onPress={handleConfirm}
        title="Confirm"
      />

    </View>
  );
}

const styles = StyleSheet.create({});
