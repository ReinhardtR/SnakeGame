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
}

export function createLeaderboard(leaderboardArray) {
  var leaderboard = document.getElementById("leaderboard");
  // Clear leaderboard
  leaderboard.innerHTML = "Leaderboard";
  for (var user of leaderboardArray) {
    // Divider
    let leaderboardDivider = document.createElement("hr");
    leaderboardDivider.classList.add("leaderboard-divider");
    leaderboard.appendChild(leaderboardDivider);

    // Item
    let leaderboardItem = document.createElement("div");
    leaderboardItem.classList.add("leaderboard-item");
    leaderboard.appendChild(leaderboardItem);

    // Text
    // Username
    let usernameText = document.createElement("span");
    usernameText.classList.add("leaderboard-username");
    usernameText.innerHTML = user.username;
    leaderboardItem.appendChild(usernameText);
    // Highscore
    let highScoreText = document.createElement("span");
    highScoreText.classList.add("leaderboard-highscore");
    highScoreText.innerHTML = user.highScore;
    leaderboardItem.appendChild(highScoreText);
  }
}
