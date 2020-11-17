import Snake from "./snake.js";
import Apple from "./apple.js";
import { GUI, playMusic, addMuteButtonListener } from "./interface.js";
import {
  currentUser,
  getUserHighScore,
  setNewHighScore,
  highScoreReceived,
} from "./firebase.js";

// Docs
const gameBoard = document.getElementById("game-board");
addMuteButtonListener();

// Game Variables
const gameSpeed = 60;
export var highScore = 0;
var score = 0;
var isAlive = false;
var textOnScreen = false;
var timeToChangeMusic = true;
var snake;
var apple;

// Event Listener Function
var startGame = function (e) {
  if (
    e.code === "KeyW" ||
    e.code === "KeyS" ||
    e.code === "KeyA" ||
    e.code === "KeyD"
  ) {
    score = 0;
    isAlive = true;
    timeToChangeMusic = true;
    snake = new Snake();
    apple = new Apple();
  }
};

export function resetHighScore() {
  highScore = 0;
}

// Start Main Loop
main();

async function main() {
  // Check if User has a high score greater than the current one
  if (!highScoreReceived && currentUser) {
    highScore = await getUserHighScore(currentUser.uid);
  }

  // Show GUI
  GUI(score, highScore);

  // Check if player is alive
  if (!isAlive) {
    // Show text on screen if not already showing
    if (!textOnScreen) screenText("Press W, A, S or D to Start");
    // Play intro music if not already playing
    if (timeToChangeMusic) changeMusic("./audio/intro.mp3");
    // Add event listener for startGame
    window.addEventListener("keydown", startGame);
  } else {
    // Reset direction boolean
    snake.changingDirection = false;
    // Update game
    update();
    // Draw game
    draw();
    // Play game music if not already playing
    if (timeToChangeMusic) changeMusic("./audio/game.mp3");
    // Remove event listener for startGame
    window.removeEventListener("keydown", startGame);
  }

  // Loop
  setTimeout(() => {
    main();
  }, gameSpeed);
}

function update() {
  snake.update();
  if (snake.collision(apple.position)) {
    playSoundOnce("./audio/point.mp3");
    snake.newSegments += apple.increaseAmount;
    score++;
    while (snake.collision(apple.position)) {
      apple.spawn();
    }
  }
  checkDeath();
}

function draw() {
  document.getElementById("game-board").innerHTML = "";
  snake.draw(gameBoard);
  apple.draw(gameBoard);
}

function checkDeath() {
  if (snake.gridCollision() || snake.selfCollision()) {
    changeMusic("./audio/intro.mp3")
    if (score > highScore) {
      highScore = score;
      if (currentUser) setNewHighScore(currentUser.uid);
    }
    textOnScreen = false;
    isAlive = false;
  }
}

function screenText(text) {
  var guiElement = document.createElement("div");
  guiElement.id = "screen-text";
  guiElement.innerHTML = text;
  gameBoard.append(guiElement);
  textOnScreen = true;
}

function changeMusic(musicFileLocation) {
  playMusic(musicFileLocation);
  timeToChangeMusic = false;
}

function playSoundOnce(audioFileLocation) {
  // Get elements
  var music = document.getElementById("music");
  var audio = document.getElementById("audio");
  var audioSrc = document.getElementById("audio-src")
  // Change audio source
  audioSrc.src = audioFileLocation
  // Match audio settings with music settings
  audio.volume = music.volume;
  audio.muted = music.muted;
  // Play sound
  audio.load();
  audio.play();
}
