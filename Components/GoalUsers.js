import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

export default function GoalUsers() {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <View>
      <Text>GoalUsers</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
