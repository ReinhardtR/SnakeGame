export default class Snake {
  constructor() {
    this.changingDirection = false;
    this.direction = { x: 1, y: 0 };
    this.body = [
      { x: 11, y: 10 },
      { x: 12, y: 10 },
    ];
    this.newSegments = 0;
  }

  // Handle control inputs
  getInputDirection() {
    window.addEventListener("keydown", (e) => {
      // If snake is already changing direction, return
      if (this.changingDirection) return;
      this.changingDirection = true;
      switch (e.code) {
        case "KeyW":
          if (this.direction.y !== 0) break;
          this.direction = { x: 0, y: -1 };
          break;
        case "KeyS":
          if (this.direction.y !== 0) break;
          this.direction = { x: 0, y: 1 };
          break;
        case "KeyA":
          if (this.direction.x !== 0) break;
          this.direction = { x: -1, y: 0 };
          break;
        case "KeyD":
          if (this.direction.x !== 0) break;
          this.direction = { x: 1, y: 0 };
          break;
      }
    });
  }

  // Update snake position
  update() {
    this.getInputDirection();
    this.addSegments();
    for (let i = this.body.length - 2; i >= 0; i--) {
      this.body[i + 1] = { ...this.body[i] };
    }

    this.body[0].x += this.direction.x;
    this.body[0].y += this.direction.y;
  }

  // Draw snake on the game board
  draw(gameBoard) {
    this.body.forEach((segment, index) => {
      const snakeElement = document.createElement("div");
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.classList.add("snake");
      if (index === 0) snakeElement.classList.add("snake-head");
      gameBoard.appendChild(snakeElement);
    });
  }

  // Check collision for the body and the given position
  collision(position, { ignoreHead = false } = {}) {
    return this.body.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return segment.x === position.x && segment.y === position.y;
    });
  }

  // Check collsion with the grid
  gridCollision() {
    return (
      this.body[0].x < 1 ||
      this.body[0].x > 24 ||
      this.body[0].y < 1 ||
      this.body[0].y > 24
    );
  }

  // Check collision with own body
  selfCollision() {
    return this.collision(this.body[0], { ignoreHead: true });
  }

  // Adds segments to the body, when there is new segments
  addSegments() {
    for (let i = 0; i < this.newSegments; i++) {
      this.body.push({ ...this.body[this.body.length - 1] });
    }
    this.newSegments = 0;
  }
}
