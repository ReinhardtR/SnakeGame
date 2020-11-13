import Snake from "./snake.js";
import Apple from "./apple.js";
import { GUI } from "./interface.js";
import { addUser } from "./leaderboard.js";

var snake;
var apple;

var isAlive = false;
var score = 0;
var highScore = 0;

// Event Functions
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

// Docs
const gameBoard = document.getElementById("game-board");
var textOnScreen = false;

var speed = 10;
var lastRenderTime = 0;
function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / speed) return;
  lastRenderTime = currentTime;

  GUI(score, highScore, isAlive);

  if (!isAlive) {
    if (!textOnScreen) {
      screenText("Press W, A, S or D to Start");
    }
    window.addEventListener("keydown", startGame);
  } else {
    update();
    draw();
    window.removeEventListener("keydown", startGame);
  }
}

window.requestAnimationFrame(main);

function screenText(text) {
  var guiElement = document.createElement("div");
  guiElement.id = "screen-text";
  guiElement.innerHTML = text;
  gameBoard.append(guiElement);
  textOnScreen = true;
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
      score = highScore;
    }
    textOnScreen = false;
  }
}
