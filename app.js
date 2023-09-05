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
var storageRef = firebase.storage().ref();


var userID = 'notsignedin';

// console.log(db);

btnLogout.addEventListener('click', handleLogout);
// btnUpload.addEventListener('click', handleUpload);
btnUpload.addEventListener('click', handleUploadBtn);
// btnOptions.addEventListener('click', handleOptionsModal);
btnCreatePost.addEventListener('click', uploadImage);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

handleAuth();
// FetchPosts();

function displayPost(postData){

    // var allPosts = document.getElementById("posts");  
    const post = document.createElement('div');
    post.classList.add('post')

    post.innerHTML = 
   `<div class="header">
      <div class="profile-area">
        <div class="post-pic">
          <img alt="jayshetty's profile picture" class="_6q-tv" data-testid="user-avatar" draggable="false" src="assets/akhil.png">
        </div>
        <span class="profile-name">jayshetty</span>
      </div>
      <div class="options">
        <div class="Igw0E rBNOH YBx95 _4EzTm" style="height: 24px; width: 24px">
          <svg aria-label="More options" class="_8-yf5" fill="#262626" height="16" viewBox="0 0 48 48" width="16">
            <circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle>
            <circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle>
            <circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle>
          </svg>
        </div>
      </div>
    </div>
    <div class="body">
      <img alt="Photo by Jay Shetty on September 12, 2020. Image may contain: 2 people." class="FFVAD" decoding="auto" sizes="614px" src="${postData.imageURL}" style="object-fit: cover">
    </div>
    <div class="footer">
      <div class="user-actions">
        <div class="like-comment-share">
          <div>
            <span class=""><svg aria-label="Like" class="_8-yf5" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg></span>
          </div>
          <div class="margin-left-small">
            <svg aria-label="Comment" class="_8-yf5" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
              <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path>
            </svg>
          </div>
          <div class="margin-left-small">
            <svg aria-label="Share Post" class="_8-yf5" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
              <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
            </svg>
          </div>
        </div>
        <div class="bookmark">
          <div class="QBdPU rrUvL">
            <svg aria-label="Save" class="_8-yf5" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
              <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
            </svg>
          </div>
        </div>
      </div>
      <span class="likes">Liked by <b>ishitaaaa.b</b> and <b>others</b></span>
      <span class="caption">
        <span class="caption-username"><b>jayshetty</b></span>
        <span class="caption-text">
          ORDER NOW: www.thinklikeamonkbook.com (LINK IN BIO)...
          more</span>
      </span>
      <span class="comment">
        <span class="caption-username"><b>akhilboddu</b></span>
        <span class="caption-text">Thank you</span>
      </span>
      <span class="comment">
        <span class="caption-username"><b>imharjot</b></span>
        <span class="caption-text"> Great stuff</span>
      </span>
      <span class="posted-time">5 HOURS AGO</span>
    </div>
    <div class="add-comment">
      <input type="text" placeholder="Add a comment...">
      <a class="post-btn">Post</a>
    </div>`


    document.querySelector(".posts").appendChild(post)
    console.log("Can read posts Div "+document.querySelector(".posts"));
}
function FetchPosts(username){

    console.log("Fetch posts called");
    
    var docRef = db.collection("users").doc(userID);
    
    docRef.get().then((doc) => {
    if (doc.exists) {
        // var data = doc.data();
        console.log("Document data:", doc.data());

        // console.log(doc.data().posts[0].imageURL);

        doc.data().posts.forEach( function(post){
          // console.log(post.imageURL);
          displayPost(post)
        })

    } else {
        console.log(username+" No posts to show");
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });   

}

function uploadImage(){
      // Assuming you have the user's UID and the selected image file
    var imageInput = document.getElementById("photo");
    var caption = document.getElementById("caption");
    var selectedFile = imageInput.files[0]; // the selected image file
    console.log(caption.value)

    // var postRef = db.collection("users");
    var postRef = db.collection("users").doc(userID);
    // var postRefArr = db.collection("users").doc(userID);

    postRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Exists Document data with UID, we writing an array to it :", doc.data());

          if (selectedFile) {
            // Generate a unique filename
            var imageName = Date.now() + "_" + selectedFile.name;

            // Create a reference to the user's directory in Firebase Storage
            var storageRef = firebase.storage().ref().child("images/" + userID + "/" + imageName);

            // Upload the image
            var uploadTask = storageRef.put(selectedFile);

            uploadTask.then(function(snapshot) {
              // Image upload successful
              console.log("Image uploaded successfully");
              handleUploadBtn(doc);

              // You can get the download URL to save in your Firestore database or use it as needed
              storageRef.getDownloadURL().then(function(downloadURL) {
                // Save the downloadURL to Firestore or perform other actions
                  console.log("Download link is "+downloadURL)

                  db.collection("users").doc(userID).update({
                    posts: firebase.firestore.FieldValue.arrayUnion({
                      userUID: userID,
                      caption: caption.value,
                      imageName: imageName,
                      imageURL: downloadURL,
                    })
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    FetchPosts();
                });

              });
            }).catch(function(error) {
              // Handle errors during the upload
              console.error("Error uploading image: ", error);
            });
          }
          else{
            console.log("Window does not exist");
          }

      } else {
        
        console.log("DONT Exist, we will create one with"+userID);
          // doc.data() will be undefined in this case
        console.log("No such document!");

        if (selectedFile) {
          // Generate a unique filename
          var imageName = Date.now() + "_" + selectedFile.name;

          // Create a reference to the user's directory in Firebase Storage
          var storageRef = firebase.storage().ref().child("images/" + userID + "/" + imageName);

          // Upload the image
          var uploadTask = storageRef.put(selectedFile);

          uploadTask.then(function(snapshot) {
            // Image upload successful
            console.log("Image uploaded successfully");
            handleUploadBtn();
            
            // You can get the download URL to save in your Firestore database or use it as needed
            storageRef.getDownloadURL().then(function(downloadURL) {
              // Save the downloadURL to Firestore or perform other actions

            db.collection("users").doc(userID).set({

                posts : [
                  {
                    userUID: userID,
                    caption: caption.value,
                    imageName: imageName,
                    imageURL: downloadURL
                  }
                ]
            })
            .then(() => {
                console.log("Document successfully written!");
                FetchPosts();
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });


            });


          }).catch(function(error) {
            // Handle errors during the upload
            console.error("Error uploading image: ", error);
          });
        }


      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });    


}

function handleAuth(){

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
// function uploadImageOld() {
//   var imageInput = document.getElementById("photo");
//   var selectedFile = imageInput.files[0];

//   if (selectedFile) {
//     // Create a reference to the Firebase Storage bucket

//     // Generate a unique name for the image file
//     var imageName = Date.now() + "_" + selectedFile.name;

//     // Upload the image to Firebase Storage
//     // var imageRef = storageRef.child("images/"+userID + imageName);
//     var imageRef = storageRef.child("images/" + userID + "/" + imageName);

//     var uploadTask = imageRef.put(selectedFile);

//     uploadTask.on(
//       "state_changed",
//       function (snapshot) {
//         // Progress monitoring
//         var progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//       },
//       function (error) {
//         // Handle errors during the upload
//         console.error("Error uploading image: ", error);
//       },
//       function () {
//         // Handle successful upload
//         console.log("Image uploaded successfully"); 
//         // You can now save the image URL to Firestore or perform any other actions.
//         // For example, to save the image URL to Firestore:
//         imageRef.getDownloadURL().then(function (downloadURL) {
//           console.log("Download link is "+downloadURL)
//           // Save downloadURL to Firestore document
//           // Here, you would typically add it to a Firestore document using Firestore's API.
//           // Remember to include Firestore in your HTML as well.
//         }).catch((error) => {
//           // A full list of error codes is available at
//           // https://firebase.google.com/docs/storage/web/handle-errors
//           switch (error.code) {
//             case 'storage/object-not-found':
//               // File doesn't exist
//               break;
//             case 'storage/unauthorized':
//               // User doesn't have permission to access the object
//               break;
//             case 'storage/canceled':
//               // User canceled the upload
//               break;
        
//             // ...
        
//             case 'storage/unknown':
//               // Unknown error occurred, inspect the server response
//               break;
//           }
//         });
//       }
//     );
    
//   } else {
//     console.error("No file selected");
//   }
// }

function handleUploadBtn(){
    console.log("Upload clicked");
    $(uploadModal).modal("toggle");
}

function handleOptionsModal(){
  console.log('Options handled');
  console.log(optionsModal);
  $(optionsModal).modal("show");
}