export default class Snake {
  constructor() {
    this.direction = { x: 1, y: 0 };
    this.body = [
      { x: 11, y: 10 },
      { x: 12, y: 10 },
    ];
    this.newSegments = 0;
    this.inputs = [];
  }

  getInputDirection() {
    if (this.inputs.length) {
      this.inputs = this.inputs.slice(0, 1);
      this.direction = this.inputs.shift();
    }

    window.addEventListener("keyup", (e) => {
      if (e.code == "KeyW") {
        if ((this.inputs.length ? this.inputs[0] : this.direction.y) !== 1) {
          this.inputs.unshift({ x: 0, y: -1 });
        }
      } else if (e.code == "KeyS") {
        if (this.direction.y !== -1) {
          this.inputs.unshift({ x: 0, y: 1 });
        }
      } else if (e.code == "KeyA") {
        if (this.direction.x !== 1) {
          this.inputs.unshift({ x: -1, y: 0 });
        }
      } else if (e.code == "KeyD") {
        if (this.direction.x !== -1) {
          this.inputs.unshift({ x: 1, y: 0 });
        }
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
    this.body.forEach((segment, index) => {
      const snakeElement = document.createElement("div");
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.classList.add("snake");
      if (index === 0) {
        snakeElement.classList.add("snake-head");
      }
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
      this.body[0].x > 24 ||
      this.body[0].y < 1 ||
      this.body[0].y > 24
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
