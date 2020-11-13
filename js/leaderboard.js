// Firebase
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

// Leaderboard
var alreadyShown = false;
export var leaderboard = function () {
  if (alreadyShown) {
    closeLeaderboard();
  } else {
    openLeaderboard();
  }
};

function openLeaderboard() {
  console.log("CREATE");
  alreadyShown = true;
}

function closeLeaderboard() {
  console.log("CLOSE");
  alreadyShown = false;
}

// Add User to Leaderboard
export function addUser(username, highScore) {
  firestore.collection("users").doc(username).set({
    username: username,
    highScore: highScore,
  });
}
