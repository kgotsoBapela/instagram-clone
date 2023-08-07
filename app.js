import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const app = document.querySelector('#app');
const firebaseAuthContainer = document.querySelector('#firebaseui-auth-container');
const btnLogout = document.querySelector('#btnLogout');
const btnUpload = document.querySelector('#btnUpload');

app.style.display = "none";
// console.log(app)

firebaseAuthContainer.style.display = "none";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBuZ4mRLBSuDdQk-7HBjZzNrFv2xSZQ0tM",
  authDomain: "instagramclone-2039b.firebaseapp.com",    
  projectId: "instagramclone-2039b",
  storageBucket: "instagramclone-2039b.appspot.com",
  messagingSenderId: "778950125166",
  appId: "1:778950125166:web:9bf3b8b53754cea2f7a87f",
  measurementId: "G-SGK47059KG"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

db.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
  console.error("Error adding document: ", error);
});
console.log(db);
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

handleAuth();

function handleAuth(){

    console.log("handle auth run");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        redirectToApp()
        console.log("User IS signed in = "+user.email)
      } else {
        redirectToAuth()
        console.log("User not signed in")
      }
    });
}
function redirectToApp(){
  firebaseAuthContainer.style.display = "none"
  app.style.display = "block";
}
function redirectToAuth(){
  app.style.display = "none";
  firebaseAuthContainer.style.display = "block"

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
      }
    ],
    // Other config options...
  });
}

btnLogout.addEventListener('click', handleLogout);

function handleLogout(){
  signOut(auth).then(() => {
    // Sign-out successful
    redirectToAuth();
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
}