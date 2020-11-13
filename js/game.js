import Snake from "./snake.js";
import Apple from "./apple.js";

var snake;
var apple;

const gui = document.getElementById("gui");
const gameBoard = document.getElementById("game-board");

var isAlive = false;

var listener = function () {
  isAlive = true;
  snake = new Snake();
  apple = new Apple();
};

var lastRenderTime = 0;
function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / 8) return;
  lastRenderTime = currentTime;

  if (!isAlive) {
    screenText("Press Any Key to Play");
    window.addEventListener("keydown", listener);
  } else {
    update();
    draw();
    window.removeEventListener("keydown", listener);
  }
}

window.requestAnimationFrame(main);

function screenText(text) {
  const guiElement = document.createElement("div");
  guiElement.classList.add("screen-text");
  guiElement.append(text);
  gameBoard.append(guiElement);
}

function update() {
  snake.update();
  if (snake.collision(apple.position)) {
    snake.newSegments += apple.increaseAmount;
    while (snake.collision(apple.position)) {
      apple.spawn();
    }
  }
  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";
  snake.draw(gameBoard);
  apple.draw(gameBoard);
}

function checkDeath() {
  if (snake.gridCollision() || snake.selfCollision()) {
    isAlive = false;
  }
}
