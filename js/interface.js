import { logInFunction, logOutFunction } from "./firebase.js";

// Interface
export function GUI(score, highScore) {
  // Scores
  document.getElementById("current-score").innerHTML = score;
  document.getElementById("high-score").innerHTML = highScore;
}

export function createLogInSection(currentUser) {
  var logInSection = document.getElementById("sign-in-wrap");
  if (currentUser) {
    // Clear section
    logInSection.innerHTML = "";
    // Signed In Text
    var signInText = document.createElement("div");
    signInText.classList = "signed-in-text";
    signInText.innerHTML = "Signed in as ";
    logInSection.appendChild(signInText);
    // Username Text
    var usernameText = document.createElement("span");
    usernameText.classList = "username-text";
    usernameText.innerHTML = currentUser.displayName;
    signInText.appendChild(usernameText);
    // Sign Out Button Text
    var signOutText = document.createElement("span");
    signOutText.classList = "sign-out-text";
    signOutText.innerHTML = "Sign Out";
    logInSection.appendChild(signOutText);
    // Add listener to sign out text
    signOutText.addEventListener("click", logOutFunction);
  } else {
    // Clear section
    logInSection.innerHTML = "";
    // Button wrap
    var button = document.createElement("div");
    button.id = "sign-in-btn";
    // Image
    var image = document.createElement("img");
    image.id = "google-icon";
    image.src =
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";
    image.alt = "G";
    // Button Text
    var text = document.createElement("p");
    text.innerHTML = "Sign in with Google";
    // Caption
    var caption = document.createElement("p");
    caption.id = "under-text";
    caption.innerHTML = "To be on the leaderboard";
    // Append
    button.appendChild(image);
    button.appendChild(text);
    logInSection.appendChild(button);
    logInSection.appendChild(caption);
    // Add listener
    button.addEventListener("click", logInFunction);
  }
}

// Leaderboard
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
    positionText.innerHTML = `${i+1}.`;
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
}

// Play music based on game state
var music = document.getElementById("music");
var source = document.getElementById("music-source");
music.muted = true;
export function playMusic(musicFileLocation) {
  source.src = musicFileLocation;
  if (!music.muted) {
    music.load();
    music.play();
  }
}

// Change volume based on slider value
var slider = document.getElementById("slider");
slider.oninput = function () {
  music.volume = slider.value / 100;
  changeVolumeIcon();
};

export function addMuteButtonListener() {
  var muteButton = document.getElementById("mute-button");
  muteButton.addEventListener("click", changeAudioMuteState);
}

var changeAudioMuteState = function () {
  music.muted = !music.muted;
  playMusic(source.src);
  changeVolumeIcon();
};

function changeVolumeIcon() {
  var icon = document.getElementById("volume-icon")
  if (!music.muted && slider.value > 0.9 ) {
    if (slider.value > 50) {
      icon.classList = "fas fa-volume-up";
    } else {
      icon.classList = "fas fa-volume-down";
    }
  } else {
    icon.classList = "fas fa-volume-mute";
  }
}
