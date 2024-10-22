import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function GoalUsers() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    async function fetchUsers() {
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
      <FlatList
        data={users}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
