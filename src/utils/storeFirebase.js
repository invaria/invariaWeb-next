import {
  collection, getDocs, addDoc, updateDoc,
  deleteDoc, doc, setDoc, query, where
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "reactform-a757a.firebaseapp.com",
  databaseURL: "https://reactform-a757a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "reactform-a757a",
  storageBucket: "reactform-a757a.appspot.com",
  messagingSenderId: "387652735491",
  appId: "1:387652735491:web:042987a9a61cef021cf436",
  measurementId: "G-EV49MZYV79"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createUser = async (user, data) => {
  console.log("createUser")
  const usersCollectionRef = collection(db, "invaria");
  await setDoc(doc(usersCollectionRef, String(user)), data, { merge: true } );
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
