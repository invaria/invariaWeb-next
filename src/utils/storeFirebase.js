import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection, getDocs, addDoc, updateDoc,
  deleteDoc, doc, setDoc, query, where
} from "firebase/firestore";


export const createUser = async (user, data) => {
  const usersCollectionRef = collection(db, "invaria");
  await setDoc(doc(usersCollectionRef, String(user)), data );
};

// export const storeFirebase = ({user, data}) => {
//   const [newName, setNewName] = useState("");
//   const [newAge, setNewAge] = useState(0);

//   const updateUser = async (id, age) => {
//     const userDoc = doc(db, "users", id);
//     const newFields = { age: age + 1 };
//     await updateDoc(userDoc, newFields);
//   };

//   const deleteUser = async (id) => {
//     const userDoc = doc(db, "users", id);
//     await deleteDoc(userDoc);
//   };

//   // if (docSnap.exists()) {   !!!!!!!


//   useEffect(() => {
//     const addCity = async () => {
//       await setDoc(doc(citiesRef, "SF"), {
//         name: "San Francisco", state: "CA", country: "USA",
//         capital: false, population: 860000,
//         regions: ["west_coast", "norcal"]
//       });
//       await setDoc(doc(citiesRef, "LA"), {
//         name: "Los Angeles", state: "CA", country: "USA",
//         capital: false, population: 3900000,
//         regions: ["west_coast", "socal"]
//       });
//     }
//     addCity()
//   }, [])
// }
