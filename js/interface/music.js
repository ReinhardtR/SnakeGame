// Get element references and mute music
var music = document.getElementById("music");
var source = document.getElementById("music-source");
music.muted = true;
// Play music based on game state
export function playMusic(musicFileLocation) {
  source.src = musicFileLocation;
  if (!music.muted) {
    music.load();
    music.play();
  }
}

// Change music volume based on slider value
var slider = document.getElementById("music-slider");
slider.oninput = function () {
  music.volume = slider.value / 100;
  changeMusicVolumeIcon();
};

// Mute button listener
export function musicMuteButtonListener() {
  var muteButton = document.getElementById("music-mute-button");
  muteButton.addEventListener("click", changeMusicMuteState);
}

var changeMusicMuteState = function () {
  music.muted = !music.muted;
  playMusic(source.src);
  changeMusicVolumeIcon();
};

// Music volume icon
function changeMusicVolumeIcon() {
  var icon = document.getElementById("music-volume-icon");
  if (!music.muted && slider.value > 0.9) {
    if (slider.value > 50) {
      icon.classList = "fas fa-volume-up";
    } else {
      icon.classList = "fas fa-volume-down";
    }
  } else {
    icon.classList = "fas fa-volume-mute";
  }
}