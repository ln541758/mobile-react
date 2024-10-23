import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { writeToDB, fetchUsers } from "../Firebase/firestoreHelper";

export default function GoalUsers({ goalId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const usersFromFirestore = await fetchUsers(`goals/${goalId}/users`);
        if (usersFromFirestore.length > 0) {
          setUsers(usersFromFirestore.map((user) => user.name));
        } else {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
          );
          if (!response.ok) {
            throw new Error(
              `An HTTP error occurred with status: ${response.status}`
            );
          }
          const data = await response.json();
          data.forEach((user) => {
            writeToDB(`goals/${goalId}/users`, user);
          });
          setUsers(data.map((user) => user.name));
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
    fetchUsersData();
  }, [goalId]);

  return (
    <View>
      <FlatList data={users} renderItem={({ item }) => <Text>{item}</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({});
