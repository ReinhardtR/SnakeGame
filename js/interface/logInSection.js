import { logInFunction, logOutFunction } from "../firebase.js";

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
