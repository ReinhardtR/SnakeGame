export default class Snake {
  constructor() {
    this.speed = 8;
    this.direction = { x: 1, y: 0 };
    this.body = [
      { x: 11, y: 11 },
      { x: 12, y: 11 },
      { x: 13, y: 11 },
      { x: 14, y: 11 },
    ];
    this.newSegments = 0;
  }

  getInputDirection() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "W":
        case "w":
          if (this.direction.y !== 0) break;
          this.direction = { x: 0, y: -1 };
          break;
        case "ArrowDown":
        case "S":
        case "s":
          if (this.direction.y !== 0) break;
          this.direction = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
        case "A":
        case "a":
          if (this.direction.x !== 0) break;
          this.direction = { x: -1, y: 0 };
          break;
        case "ArrowRight":
        case "D":
        case "d":
          if (this.direction.x !== 0) break;
          this.direction = { x: 1, y: 0 };
          break;
      }
    });
  }

  update() {
    this.getInputDirection();
    this.addSegments();
    for (let i = this.body.length - 2; i >= 0; i--) {
      this.body[i + 1] = { ...this.body[i] };
    }

    this.body[0].x += this.direction.x;
    this.body[0].y += this.direction.y;
  }

  draw(gameBoard) {
    this.body.forEach((segment) => {
      const snakeElement = document.createElement("div");
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.classList.add("snake");
      gameBoard.appendChild(snakeElement);
    });
  }

  collision(position, { ignoreHead = false } = {}) {
    return this.body.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return segment.x === position.x && segment.y === position.y;
    });
  }

  gridCollision() {
    return (
      this.body[0].x < 1 ||
      this.body[0].x > 21 ||
      this.body[0].y < 1 ||
      this.body[0].y > 21
    );
  }

  selfCollision() {
    return this.collision(this.body[0], { ignoreHead: true });
  }

  addSegments() {
    for (let i = 0; i < this.newSegments; i++) {
      this.body.push({ ...this.body[this.body.length - 1] });
    }
    this.newSegments = 0;
  }
}
