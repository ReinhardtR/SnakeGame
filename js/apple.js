export default class Apple {
  constructor() {
    this.increaseAmount = 4;
    this.position = this.spawn();
  }

  spawn() {
    const gridSize = 21;
    return (this.position = {
      x: Math.floor(Math.random() * gridSize) + 1,
      y: Math.floor(Math.random() * gridSize) + 1,
    });
  }

  draw(gameBoard) {
    const appleElement = document.createElement("div");
    appleElement.style.gridColumnStart = this.position.x;
    appleElement.style.gridRowStart = this.position.y;
    appleElement.classList.add("apple");
    gameBoard.appendChild(appleElement);
  }
}
