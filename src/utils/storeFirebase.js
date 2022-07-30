import {
  collection, getDocs, addDoc, updateDoc,
  deleteDoc, doc, setDoc, query, where
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "invaria-kyc.firebaseapp.com",
  projectId: "invaria-kyc",
  storageBucket: "invaria-kyc.appspot.com",
  messagingSenderId: "657214210738",
  appId: "1:657214210738:web:ac00d0316118c02ae4bfab",
  measurementId: "G-GG5K9WCNRQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createUser = async (user, data) => {
  const usersCollectionRef = collection(db, "invaria");
  await setDoc(doc(usersCollectionRef, String(user)), data, { merge: true });
  console.log("createUser")
  return "created"
};

export const getUser = async (address) => {
  const usersCollectionRef = collection(db, "invaria");
  const q = query(usersCollectionRef, where("address", "==", address));
  console.log("q", q)
  const querySnapshota = await getDocs(q);
  let state
  querySnapshota.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log("gujvgh", doc.data());

    console.log(doc.id, " => ", doc.data().audit_status);
    state = doc.data().audit_status
  });

  return state
}























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
