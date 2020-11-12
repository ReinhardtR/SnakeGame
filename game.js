import Snake from "./snake.js";
import Apple from "./apple.js";

var snake = new Snake();
var apple = new Apple();

const gameBoard = document.getElementById("game-board");
var lastRenderTime = 0;

var isAlive = false;
var score = 0;

function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snake.speed) return;

  lastRenderTime = currentTime;

  if (isAlive) {
    update();
    draw();
  } else {
    window.addEventListener("keydown", () => {isAlive = true});
  }
}

window.requestAnimationFrame(main);

function update() {
  console.log("ALIVE");
  snake.update();
  if (snake.collision(apple.position)) {
    score++;
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
  if (snake.body[0].x < 0 || snake.body[0].y < 0) {
    isAlive = false;
  }
}
