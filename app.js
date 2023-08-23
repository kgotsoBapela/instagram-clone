import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// import { getStorage, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const app = document.querySelector('#app'),
      firebaseAuthContainer = document.querySelector('#firebaseui-auth-container'),
      // uploadModal = document.querySelector('#myModal'),
      optionsModal = document.querySelector('#options-modal'),
      uploadModal = document.querySelector('#upload-modal'),
      btnLogout = document.querySelector('#btnLogout'),
      btnOptions = document.querySelector('.options'),
      btnUpload = document.querySelector('#btnUpload'),
      btnCreatePost = document.querySelector('#create-post-btn');
      // modal = document.querySelector('#myModal');
    
app.style.display = "none";

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
const auth = firebase.auth(),
      db = firebase.firestore(),
      analytics = firebase.analytics();


var userID = 'notsignedin';

console.log(db);

btnLogout.addEventListener('click', handleLogout);
// btnUpload.addEventListener('click', handleUpload);
btnUpload.addEventListener('click', handleUpload);
btnOptions.addEventListener('click', handleOptionsModal);
btnCreatePost.addEventListener('click', uploadImage);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

handleAuth();
FetchPosts();
// handleUpload();

function FetchPosts(username){
    var docRef = db.collection("users").doc(userID);

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log(username+" No posts to show");
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
function handleAuth(){

    console.log("handle auth run");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        userID = user.uid;
        redirectToApp();
        console.log("User IS signed in = "+user.email);
        console.log("User IS signed in = "+user.uid);

        FetchPosts(user.email);
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
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl)=> {
        userID = user.uid;
        redirectToApp();
        console.log("Callback IS signed in = "+user.email);
        console.log("Callback IS signed in = "+user.uid);
      }
    },
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
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

function uploadImage() {

  var imageInput = document.getElementById("photo");
  var selectedFile = imageInput.files[0];

  // console.log(imageInput);

  if (selectedFile) {
    // Create a reference to the Firebase Storage bucket
    var storageRef = firebase.storage().ref();

    // Generate a unique name for the image file
    var imageName = Date.now() + "_" + selectedFile.name;

    // Upload the image to Firebase Storage
    var imageRef = storageRef.child("images/" + imageName);
    var uploadTask = imageRef.put(selectedFile);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Progress monitoring
        var progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (error) {
        // Handle errors during the upload
        console.error("Error uploading image: ", error);
      },
      function () {
        // Handle successful upload
        console.log("Image uploaded successfully");
        
        // You can now save the image URL to Firestore or perform any other actions.
        // For example, to save the image URL to Firestore:
        imageRef.getDownloadURL().then(function (downloadURL) {
          // Save downloadURL to Firestore document
          // Here, you would typically add it to a Firestore document using Firestore's API.
          // Remember to include Firestore in your HTML as well.
        });
      }
    );
  } else {
    console.error("No file selected");
  }
}


function handleUpload(){

    console.log("Upload clicked");
    $(uploadModal).modal("show");

    // Add a new document in collection "cities"
    // db.collection("users").doc(userID).set({
    //   posts: [
    //     {
    //     img: "img1",
    //     caption: "Caption1"
    //   }
    //   ]
    // })
    // .then(() => {
    //   console.log("Document successfully written!");
    // })
    // .catch((error) => {
    //   console.error("Error writing document: ", error);
    // });

}
function handleOptionsModal(){
  console.log('Options handled');
  console.log(optionsModal);
  $(optionsModal).modal("show");

}