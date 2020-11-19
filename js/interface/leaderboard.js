export function createLeaderboard(leaderboardArray) {
  var leaderboard = document.getElementById("leaderboard");
  // Clear leaderboard
  leaderboard.innerHTML = "";
  // Create leaderboard title
  var leaderboardTitle = document.createElement("span");
  leaderboardTitle.id = "leaderboard-title";
  leaderboardTitle.innerHTML = "Leaderboard";
  leaderboard.appendChild(leaderboardTitle);
  for (let i = 0; i < leaderboardArray.length; i++) {
    // Divider
    let leaderboardDivider = document.createElement("hr");
    leaderboardDivider.classList.add("leaderboard-divider");
    leaderboard.appendChild(leaderboardDivider);
    // Item
    let leaderboardItem = document.createElement("div");
    leaderboardItem.classList.add("leaderboard-item");
    leaderboard.appendChild(leaderboardItem);
    // Text
    let positionText = document.createElement("span");
    positionText.classList.add("leaderboard-highscore", "leaderboard-position");
    positionText.innerHTML = `${i + 1}.`;
    leaderboardItem.appendChild(positionText);
    // Username
    let usernameText = document.createElement("span");
    usernameText.classList.add("leaderboard-username");
    usernameText.innerHTML = leaderboardArray[i].username;
    leaderboardItem.appendChild(usernameText);
    // Highscore
    let highScoreText = document.createElement("span");
    highScoreText.classList.add("leaderboard-highscore");
    highScoreText.innerHTML = leaderboardArray[i].highScore;
    leaderboardItem.appendChild(highScoreText);
  }
  // Bottom line
  let lastLeaderboardDivider = document.createElement("hr");
  lastLeaderboardDivider.classList.add("leaderboard-divider");
  leaderboard.appendChild(lastLeaderboardDivider);
}
