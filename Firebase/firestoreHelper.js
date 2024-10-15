import { collection, addDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(collectionName, data) {
  try {
    await addDoc(collection(database, collectionName), data);
    // console.log("Document written with ID: ", docRef.id);
    // console.log(docRef);
  } catch (err) {
    console.error("write to db ", err);
  }
}
