import { logInFunction } from "./firebase.js";

// Interface
export function GUI(score, highScore) {
  // Scores
  document.getElementById("current-score").innerHTML = score;
  document.getElementById("high-score").innerHTML = highScore;

  // Login
  document
    .getElementById("sign-in-btn")
    .addEventListener("click", logInFunction);
  // Leaderboard
  

}
