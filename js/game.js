import Snake from "./snake.js";
import Apple from "./apple.js";
import {
  GUI,
  playMusic,
  changeAudioVolume,
  addMuteButtonListener,
} from "./interface.js";
import {
  currentUser,
  getUserHighScore,
  setNewHighScore,
  highScoreReceived,
} from "./firebase.js";

// Set initial volume
changeAudioVolume(0.25);
addMuteButtonListener();

// Docs
const gameBoard = document.getElementById("game-board");

// Game Variables
const gameSpeed = 60;
export var highScore = 0;
var score = 0;
var isAlive = false;
var textOnScreen = false;
var changeMusic = true;
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
    changeMusic = true;
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
    if (changeMusic) {
      playMusic("./music/intro.mp3");
      changeMusic = false;
    }
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
    if (changeMusic) {
      playMusic("./music/game.mp3");
      changeMusic = false;
    }
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
    changeMusic = true;
    isAlive = false;
    if (score > highScore) {
      highScore = score;
      if (currentUser) setNewHighScore(currentUser.uid);
    }
    textOnScreen = false;
  }
}

function screenText(text) {
  var guiElement = document.createElement("div");
  guiElement.id = "screen-text";
  guiElement.innerHTML = text;
  gameBoard.append(guiElement);
  textOnScreen = true;
}
