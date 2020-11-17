import { highScore, resetHighScore } from "./game.js";
import { createLeaderboard } from "./interface/leaderboard.js";
import { createLogInSection } from "./interface/logInSection.js";

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
  createLogInSection(user);
});

// Login Function
export var logInFunction = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      if (result.user) {
        addUser(result.user.uid, result.user.displayName);
      }
    });
};

// Logout Function
export var logOutFunction = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      resetHighScore();
    });
};

// Add User to 'users' Collection
export async function addUser(uid, username) {
  var userDoc = await firestore.collection("users").doc(uid);
  // Create database document for the user
  userDoc.set({
    username: username,
    highScore: await compareHighScores(userDoc),
  });
}

// Returns the highest score between the database and the instance
function compareHighScores(userDoc) {
  return userDoc.get().then((doc) => {
    if (doc.data()) {
      return doc.data().highScore > highScore
        ? doc.data().highScore
        : highScore;
    } else {
      return highScore;
    }
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
      if (doc.data()) {
        return doc.data().highScore > highScore
          ? doc.data().highScore
          : highScore;
      } else {
        return highScore;
      }
    });
}

// Set current user's high score
export function setNewHighScore(uid) {
  firestore.collection("users").doc(uid).update({
    highScore: highScore,
  });
}

// Listen to high score changes and get snapshot
var leaderboardArray = [];
firestore.collection("users").onSnapshot((querySnapshot) => {
  // Clear array
  leaderboardArray = [];
  querySnapshot.forEach((doc) => {
    // Add to array
    leaderboardArray.push(doc.data());
    // Sort array by user highscore (Descending)
    leaderboardArray.sort((a, b) => b.highScore - a.highScore);
  });
  createLeaderboard(leaderboardArray);
});
