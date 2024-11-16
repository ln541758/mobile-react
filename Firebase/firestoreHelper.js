import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { database, auth } from "./firebaseSetup";

export async function writeToDB(collectionName, data) {
  try {
    await addDoc(collection(database, collectionName), data);
    // console.log("Document written with ID: ", docRef.id);
    // console.log(docRef);
  } catch (err) {
    console.error("write to db ", err);
  }
}

export async function writeWithIdToDB(data, collectionName, id) {
  try {
    await setDoc(doc(database, collectionName, id), data, { merge: true });
  } catch (err) {
    console.error("write to db ", err);
  }
}

export async function deleteFromDB(deletedID, collectionName) {
  console.log("deleteFromDB ", deletedID, collectionName);
  try {
    await deleteDoc(doc(database, collectionName, deletedID));
  } catch (err) {
    console.error("delete from db ", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    // get all the documents in the collection
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapShot) => {
      deleteDoc(doc(database, collectionName, docSnapShot.id));
    });
  } catch (err) {
    console.error("delete all from db ", err);
  }
}

export async function markGoalAsWarning(goalID) {
  try {
    await updateDoc(doc(database, "goals", goalID), { warning: true });
  } catch (err) {
    console.error("mark goal as warning ", err);
  }
}

export async function fetchUsers(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    let newArray = [];
    if (querySnapshot.empty) {
      querySnapshot.forEach((docSnapshot) => {
        newArray.push(docSnapshot.data());
      });
    }
    return newArray;
  } catch (error) {
    console.error("Error fetching user data", error);
  }
}
