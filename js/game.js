import Snake from "./snake.js";
import Apple from "./apple.js";
import { updateScores } from "./interface/scores.js";
import { musicMuteButtonListener, playMusic } from "./interface/music.js";
import {
  soundEffectsMuteButtonListener,
  playSoundOnce,
} from "./interface/soundEffects.js";
import {
  currentUser,
  getUserHighScore,
  setNewHighScore,
  highScoreReceived,
} from "./firebase.js";

// Get gameboard reference
const gameBoard = document.getElementById("game-board");

// Add listeners
musicMuteButtonListener();
soundEffectsMuteButtonListener();

// Game Variables
const gameSpeed = 60;
export var highScore = 0;
var score = 0;
var isAlive = false;
var textOnScreen = false;
var timeToChangeMusic = true;
var snake;
var apple;

// Event Listener Function to start the game
var startGame = function (e) {
  if (
    e.code === "KeyW" ||
    e.code === "KeyS" ||
    e.code === "KeyA" ||
    e.code === "KeyD" ||
    e.code === "ArrowUp" ||
    e.code === "ArrowDown" ||
    e.code === "ArrowLeft" ||
    e.code === "ArrowRight"
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
  updateScores(score, highScore);

  // Check if player is alive
  if (!isAlive) {
    // Show text on screen if not already showing
    if (!textOnScreen) screenText("Press W, A, S, D or Arrow Keys to Start");
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
    playSoundOnce("./audio/death.mp3");
    changeMusic("./audio/intro.mp3");
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
