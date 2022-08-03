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
  // const q = query(usersCollectionRef, where("address", "==", "0xd33f4E98D16318e47dcC381345B4B408E02b6a92"));//0xd33f4E98D16318e47dcC381345B4B408E02b6a92 //0xA450cC0A298d99C2794b2F26b9f8e4302a8fE5e1

  // console.log("q", q)
  const querySnapshota = await getDocs(q);
  let state = "Unverified"
  let realState, realResult
  let stateCode = 404
  querySnapshota.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log("doc", doc.data(), doc.data().audit_status);

    // console.log(doc.id, " => ", doc.data().audit_status);
    // console.log(doc.id, "jio => ", doc.data().reject_reasons, (doc.data().reject_reasons)?.length);

    // state = "Unverified"
    // if ((doc.data().reject_reasons)?.length === 0) {
    //   state = doc.data().reject_reasons
    // }
    // if ((doc.data().reject_reasons)?.length !== 0) {
    //   state == "Verified"
    // }
    //////
    // if (doc.data().state == undefined && (stateCode !== 4 || stateCode !== 1)) {
    //   if (doc.data().audit_status) {
    //     state = doc.data().audit_status
    //   }
    //   console.log("undef", doc.data().state)
    // }
    // if (doc.data().state == 4 && (stateCode !== 1)) {
    //   stateCode = 4
    //   state == "Rejected"
    //   console.log(4)
    // }
    // if (doc.data().state == 1) {
    //   stateCode = 1
    //   state = doc.data().audit_status
    //   console.log(1)
    // }
    /////////
    // if (doc.data().audit_status !== undefined
    //   && doc.data().review_reasons !== undefined
    //   && (state !== "Accepted" && state !== "Rejected")) {
    //   console.log("state", state)
    //   state = "Pending"
    //   console.log("state", state)

    //   if (doc.data().review_reasons !== undefined) {
    //     if (doc.data().review_reasons !== 0 || doc.data().reject_reasons !== 0) {
    //       state = "Rejected"
    //     } else {
    //       state = "Verified"
    //     }
    //   }
    //   console.log("state", state)
    // }
    ///////
    if (doc.data().audit_status !== undefined) {
      console.log("state un ", state, doc.data().state)
      if (doc.data().audit_status == "Accepted") {
        state = "Accepted"
        console.log("state ac ", state)

      } else if (state !== "Accepted" && doc.data().audit_status == "Rejected") {
        state = "Rejected"
        console.log("state rej ", state)

      } else if (state !== "Rejected" && doc.data().audit_status == "Pending" && (doc.data().reject_reasons).length !== 0 && doc.data().state==0 ){
        state = doc.data().audit_status
        console.log("state pend", state)
      }
    }

  });
  console.log("re", stateCode, state)
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
