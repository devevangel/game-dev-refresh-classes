// Canvas grabbing and UI setup
const canvas = document.querySelector("#gamearea");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ravens = [];
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;

class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.size = Math.random() * 0.2 + 0.4;
        this.width = this.spriteWidth * this.size;
        this.height = this.spriteHeight * this.size;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.isDestory = false;
        this.image = new Image();
        this.image.src = "assets/raven.png";
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
    }

    update(deltaTime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x = this.x - this.directionX;
        this.y = this.y + this.directionY;
        if (this.x < 0 - this.width) this.isDestory = true;
        this.timeSinceFlap = this.timeSinceFlap + deltaTime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            this.frame++;
            this.timeSinceFlap = 0;
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

function gameLooop(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven = timeToNextRaven + deltaTime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
    }

    [...ravens].forEach((obj) => obj.update(deltaTime));
    [...ravens].forEach((obj) => obj.draw());
    ravens = ravens.filter((raven) => raven.isDestory !== true);
    requestAnimationFrame(gameLooop);
}

gameLooop(0);
