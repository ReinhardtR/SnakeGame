
import Snake from "./snake.js";
import Apple from "./apple.js";
import { GUI } from "./interface.js";
import {
  currentUser,
  getUserHighScore,
  setNewHighScore,
  highScoreReceived,
} from "./firebase.js";

// Docs
const gameBoard = document.getElementById("game-board");

// Game Variables
const gameSpeed = 60;
export var highScore = 0;
var score = 0;
var isAlive = false;
var textOnScreen = false;
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
    snake = new Snake();
    apple = new Apple();
  }
};

export function resetHighScore()  {
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

  // Show Text on Screen if game isn't being played
  if (!isAlive) {
    if (!textOnScreen) screenText("Press W, A, S or D to Start");
    window.addEventListener("keydown", startGame);
  } else {
    snake.changingDirection = false;
    update();
    draw();
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
