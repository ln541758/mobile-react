import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  Alert,
} from "react-native";
import React from "react";
import { useState, useEffect, useRef } from "react";

export default function Input({
  autoFocus,
  inputHandler,
  modalVisible,
  cancelHandler,
}) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [showCount, setShowCount] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  function handleConfirm() {
    // console.log(userText);
    inputHandler(text);
  }

  const handleBlur = () => {
    if (text.length >= 3) {
      setMessage("Thank you");
    } else {
      setMessage("Please type more than 3 characters");
    }
    setShowCount(false);
  };

  function handleCancel() {
    Alert.alert("isCancel", "Do you want to cancel?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          cancelHandler();
          setText("");
        },
      },
    ]);
  }

  return (
    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          ref={inputRef}
          placeholder="Type something"
          keyboardType="default"
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
        <Button onPress={handleCancel} title="Cancel" />
        <Button onPress={handleConfirm} title="Confirm" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  input: { borderColor: "purple", borderWidth: 2, padding: 5 },
});
