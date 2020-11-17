// Sound Effects
// Get element references and mute soundEffects
var soundEffects = document.getElementById("sound-effects");
var soundEffectsSrc = document.getElementById("sound-effects-src");
soundEffects.muted = true;

// Play a sound file once
export function playSoundOnce(soundEffectsFile) {
  // Change soundEffects source
  soundEffectsSrc.src = soundEffectsFile;
  // Play sound
  soundEffects.load();
  soundEffects.play();
}

// Change sound effects volume based on slider value
var slider = document.getElementById("effects-slider");
slider.oninput = function () {
  soundEffects.volume = slider.value / 100;
  changeSoundEffectsVolumeIcon();
};

// Mute button listener
export function soundEffectsMuteButtonListener() {
  var muteButton = document.getElementById("effects-mute-button");
  muteButton.addEventListener("click", changeSoundEffectsMuteState);
}

var changeSoundEffectsMuteState = function () {
  soundEffects.muted = !soundEffects.muted;
  changeSoundEffectsVolumeIcon();
};

// Music volume icon
function changeSoundEffectsVolumeIcon() {
  var icon = document.getElementById("effects-volume-icon");
  if (!soundEffects.muted && slider.value > 0.9) {
    if (slider.value > 50) {
      icon.classList = "fas fa-volume-up";
    } else {
      icon.classList = "fas fa-volume-down";
    }
  } else {
    icon.classList = "fas fa-volume-mute";
  }
}
