import { highScore } from "./game.js";

// Initialize
var firebaseConfig = {
  apiKey: "AIzaSyDQrUHj_Ef9rec5FXJZEYc6T_u1lX_07lo",
  authDomain: "snake-rar.firebaseapp.com",
  databaseURL: "https://snake-rar.firebaseio.com",
  projectId: "snake-rar",
  storageBucket: "snake-rar.appspot.com",
  messagingSenderId: "526319318546",
  appId: "1:526319318546:web:9b32402d1ebc3f1c2e8acb",
};
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

// Listen to Auth State Change and export user
export var currentUser;
firebase.auth().onAuthStateChanged((user) => {
  currentUser = user;
})

// Login Function
export var logInFunction = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      addUser(user.uid, user.displayName);
    });
};

// Add User to 'users' Collection
export function addUser(uid, username) {
  var userDoc = firestore.collection("users").doc(uid);
  // If user is already in database, check if the stored highscore is greater than the current highscore
  if (userDoc.exists) {
    var setHighScore =
      highScore > userDoc.highScore ? highScore : userDoc.highScore;
  }
  // Create database document for the user
  userDoc.set({
    username: username,
    highScore: setHighScore,
  });
}

// Read current user's high score
export var highScoreReceived = false;
export function getUserHighScore(uid) {
  return firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      highScoreReceived = true;
      return doc.data().highScore;
    });
}

// Set current user's high score
export function setNewHighScore(uid) {
  firestore.collection("users").doc(uid).update({
    highScore: highScore,
  });
}
