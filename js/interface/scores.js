export function updateScores(score, highScore) {
  // Scores
  document.getElementById("current-score").innerHTML = score;
  document.getElementById("high-score").innerHTML = highScore;
}
