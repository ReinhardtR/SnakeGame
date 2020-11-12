import Snake from "./snake.js";
import Apple from "./apple.js";

var snake = new Snake();
var apple = new Apple();

const gameBoard = document.getElementById("game-board");
var lastRenderTime = 0;

function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snake.speed) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  snake.update();
  if (snake.collision(apple.position)) {
    snake.newSegments += apple.increaseAmount;
    while (snake.collision(apple.position)) {
      apple.spawn();
    }
  }
}

function draw() {
  gameBoard.innerHTML = "";
  snake.draw(gameBoard);
  apple.draw(gameBoard);
}
