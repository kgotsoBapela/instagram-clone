import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const app = document.querySelector('#app'),
      firebaseAuthContainer = document.querySelector('#firebaseui-auth-container'),
      btnLogout = document.querySelector('#btnLogout'),
      btnUpload = document.querySelector('.btnUpload'),
      showModal = document.querySelector('.showModal');
  

app.style.display = "none";
// console.log(app)
btnLogout.addEventListener('click', handleLogout);
btnUpload.addEventListener('click', handleUpload);

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
        requireDisplayName: false
      }
    ],
    // Other config options...
  });
}

function handleLogout(){
  signOut(auth).then(() => {
    // Sign-out successful
    redirectToAuth();
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
}

function handleUpload(){
  showModal.classList.add("active");
  console.log(showModal)
  console.log("Upload clicked");
}