import Snake from "./snake.js";
import Apple from "./apple.js";

var snake;
var apple;

var isAlive = false;
var score = 0;
var highScore = 0;

var startGame = function () {
  score = 0;
  isAlive = true;
  snake = new Snake();
  apple = new Apple();
};

const gameBoard = document.getElementById("game-board");
var lastRenderTime = 0;
function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / 8) return;
  lastRenderTime = currentTime;

  GUI();

  if (!isAlive) {
    screenText("Press Any Key to Play");
    window.addEventListener("keydown", startGame);
  } else {
    update();
    draw();
    window.removeEventListener("keydown", startGame);
  }
}

window.requestAnimationFrame(main);

function GUI() {
  document.getElementById("current-score").innerHTML = score;
  document.getElementById("high-score").innerHTML = highScore;
}

function screenText(text) {
  const guiElement = document.createElement("div");
  guiElement.id = "screen-text";
  guiElement.innerHTML = text;
  gameBoard.append(guiElement);
}

function update() {
  GUI();
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
    }
  }
}
